import { AxiosResponse } from "axios";

export function handleResponse(response: AxiosResponse) {
    return response.data ?? response;
}

export function handleError(error: any) {
    return error.data ?? error;
}