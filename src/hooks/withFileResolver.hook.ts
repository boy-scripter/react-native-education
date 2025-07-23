import { TypedUseMutation } from '@reduxjs/toolkit/query/react';
import { useLoginWithEmailMutation } from '@/graphql/generated';

async function withFileResolver<M extends TypedUseMutation<any, any, any>>(
    useMutation: M,
    fileNames: string[]
) {
    const [trigger] = useLoginWithEmailMutation()

    const data = await trigger({
        input: {
            email: '',
            password: ''
            // name: 'string'
            // mediaCode: 'string',
            // contentType: 'string'
        }
    }).unwrap()

    data




}