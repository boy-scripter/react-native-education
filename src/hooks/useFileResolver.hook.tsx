import {InitiateUploadMutation, useInitiateUploadMutation} from '@/graphql/generated';
import {errorToast} from '@/components/Toast/Toast.config';
import {TypedUseMutation} from '@reduxjs/toolkit/query/react';
import {File} from '@/util/zod';
import {useState} from 'react';

type Props<ResultType, QueryType, Keys> = {
  mutation: TypedUseMutation<ResultType, QueryType, any>;
  pathKeys: Keys;
};

interface FileLike {
  type: string;
  name: string;
  size: number;
  uri?: string;
}

type ReplaceType<T, P> = {
  [K in keyof T]: K extends P ? string | FileLike : T[K] extends object ? ReplaceType<T[K], P> : T[K];
};

export function useFileResolver<ResultType, QueryType extends Record<string, any>, Keys extends string[]>({
  mutation,
  pathKeys,
}: Props<ResultType, QueryType, Keys>): [
  (args: ReplaceType<QueryType, Keys[number]>) => Promise<ResultType>,
  {
    isLoading: boolean;
    isError: boolean;
    error: any;
    // Optional: include more from mutationState like data, reset, etc.
  },
] {
  const [initiateUpload] = useInitiateUploadMutation();
  const [trigger, mutationState] = mutation();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<Error | null>(null);

  type TransformedInput = ReplaceType<QueryType, Keys[number]>;

  const wrappedTrigger = async (args: TransformedInput): Promise<ResultType> => {
    let input = args.input; //fix here

    setUploading(true);
    setUploadError(null);
    try {
      const eligibleForUploads = Object.entries(input).filter(([key]) => pathKeys.includes(key)) as [string, File][];

      for (const [key, file] of eligibleForUploads) {
        if (!file.mediaCode) {
          errorToast({text1: 'media code was nto present when uploading'});
          throw new Error('media code was nto present when uploading');
        }

        const data = await initiateUpload({
          input: {
            name: file.name,
            contentType: file.type || '*',
            mediaCode: file.mediaCode,
          },
        }).unwrap();

        await fileUploadToS3(data, file);
        input = {...input, [key]: data.initiateUpload.uploadId};
      }

      return await trigger({input} as any).unwrap();
    } catch (err) {
      setUploadError(err as Error);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const combinedState = {
    isLoading: uploading || mutationState.isLoading,
    isError: !!uploadError || mutationState.isError,
    error: uploadError ?? mutationState.error,
  };

  return [wrappedTrigger, combinedState];
}

async function fileUploadToS3(arg: InitiateUploadMutation, file: File) {
  const { uploadId, signedData } = arg.initiateUpload;
  const { url, fields } = signedData;

  const formData = new FormData();
  
  // Add all the signed fields from S3 first (order matters!)
  // Common fields include: key, bucket, X-Amz-Algorithm, X-Amz-Credential, X-Amz-Date, Policy, X-Amz-Signature
  if (fields) {
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }
  
  // Add the file last - the field name must match what's in the policy (usually 'file')
  formData.append('file', {
    uri: file.uri ,
    name: file.name,
    type: file.type,
    size: file.size
  } as any);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // No headers needed - FormData handles Content-Type automatically
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('S3 Error Response:', errorText);
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // S3 usually returns 204 No Content on success
    return {
      success: true,
      uploadId,
      status: response.status,
      location: response.headers.get('Location') || `${url}/${fields?.key || file.name}`,
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}