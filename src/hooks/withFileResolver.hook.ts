import { Exact, UploadDto, useInitiateUploadMutation } from '@/graphql/generated';
import { TypedUseMutation } from '@reduxjs/toolkit/query/react';

// type EnsureKeysAreString<T, K extends keyof T> = Omit<T, K> & {
//     K: string;
// };

// export async function withFileResolver<
//     T extends Record<string, any>,
//     K extends keyof T
// >(
//     payload: T,
//     pathKeys: K
// ): Promise<EnsureKeysAreString<T, K>> {

//     const [initiateUpload] = useInitiateUploadMutation();

//     const eligibleForUploads = Object.entries(payload)
//         .filter(([key, value]) => pathKeys === key)

//     const updatedEntries = await Promise.all(
//         eligibleForUploads.map(
//             async ([key, file]) => {

//                 const data = await initiateUpload({
//                     input: {
//                         name: file.name,
//                         mediaCode: file.metaData?.mediaCode || "default", // Fix 3: Remove quotes and add fallback
//                         contentType: file.type,
//                     },
//                 }).unwrap();

//                 const { signedData, uploadId } = data.initiateUpload;


//                 const { url, headers } = signedData;
//                 await fetch(url, {
//                     method: 'PUT',
//                     headers: headers,
//                     body: file,
//                 });

//                 return { [key]: uploadId };

//             }
//         )
//     );

//     // Fix 6: Merge the array of objects into a single object
//     const mergedUpdatedEntries = updatedEntries.reduce((acc, entry) => ({ ...acc, ...entry }), {});

//     return { ...payload, ...mergedUpdatedEntries };
// }



type Props<T> = {
    mutation: T,
    pathKeys: string[]
}

type ExtractMutationArg<T extends TypedUseMutation<any, any, any>> = Parameters<ReturnType<T>[0]>[0];


function useFileResolver<T extends TypedUseMutation<any, any, any>>({ mutation, pathKeys }: Props<T>) {
    const [initiateUpload] = useInitiateUploadMutation();
    const [trigger] = mutation();

    return (arg: ExtractMutationArg<T>) => initiateUpload(arg)

}