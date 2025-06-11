import {baseApiSlice} from "../baseApi/baseApi.slice"

const authApi = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        builder
    })
})