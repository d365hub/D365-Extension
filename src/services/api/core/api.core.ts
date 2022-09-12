import axios from "axios";
import { handleError, handleResponse } from "../response";

const baseUrl = "https://api-management-d365hub.azure-api.net/D365Hub/v1";;

export class ApiCore {
    constructor() {
    }

    get<T>(relativeUrl: string) {
        return axios
            .get<T>(`${baseUrl}/${relativeUrl}`)
            .then(handleResponse)
            .catch(handleError);
    }

    // post(relativeUrl: string, model: any) {
    //     return axios.post(relativeUrl, model)
    //         .then(handleResponse)
    //         .catch(handleError);
    // }

    // put(relativeUrl: string, model: any) {
    //     return axios.put(`${baseUrl}/${relativeUrl}`, model)
    //         .then(handleResponse)
    //         .catch(handleError);
    // }

    // patch(relativeUrl: string) {
    //     return axios.patch(`${baseUrl}/${relativeUrl}`, module)
    //         .then(handleResponse)
    //         .catch(handleError);
    // }

    // delete(relativeUrl: string, id: string) {
    //     return axios.delete(`${baseUrl}/${relativeUrl}`)
    //         .then(handleResponse)
    //         .catch(handleError);
    // }
}

