import {InitiateUploadMutation, UploadDto, useInitiateUploadMutation} from '@/graphql/generated';
import {File} from '@/util/zod';
import {TypedUseMutation} from '@reduxjs/toolkit/query/react';

type Props<ResultType, QueryType> = {
  mutation: TypedUseMutation<ResultType, QueryType, any>;
  pathKeys: string[];
};

type Override<T, R> = Omit<T, keyof R> & R;

export function useFileResolver<ResultType, QueryType extends Record<string, any>>({mutation, pathKeys}: Props<ResultType, QueryType>) {
  const [initiateUpload] = useInitiateUploadMutation();
  const [trigger, mutationState] = mutation();

  const wrappedTrigger = async <T extends QueryType['input']>(args: {input: T & {[P in (typeof pathKeys)[number]]: any}}) => {
    let input = {...args.input};

    const eligibleForUploads = Object.entries(input).filter(([key, value]) => pathKeys.includes(key)) as [string, File][]; // Now typed correctly

    for (const [key, file] of eligibleForUploads) {
      const data = await initiateUpload({
        input: {
          name: file.name,
          mediaCode: (file as any)?.metadata?.mediaCode,
          contentType: file.type,
        },
      }).unwrap();

      await fileUploadToS3(data, file);
      input = {...input, [key]: data.initiateUpload.uploadId};
    }

    return trigger({input} as any);
  };

  return [wrappedTrigger, mutationState] as const;
}

async function fileUploadToS3(arg: InitiateUploadMutation, file: File) {
  const {uploadId, signedData} = arg.initiateUpload;
  const {url, ...headers} = signedData;

  const formData = new FormData();

  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      ...headers,
    },
    body: formData,
  });
}
