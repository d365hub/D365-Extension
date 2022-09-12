import axios from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = "https://api-management-d365hub.azure-api.net/D365Hub/v1";;

const getAll = <T>(resource: string) => {
    return axios
        .get<T>(`${BASE_URL}/${resource}`)
        .then(handleResponse)
        .catch(handleError);
};


const getSingle = (resource: string, id: string) => {
    return axios
        .get(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

const post = (resource: string, model: any) => {
    return axios
        .post(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError);
}

const put = (resource: string, model: any) => {
    return axios
        .put(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError);
}


const patch = (resource: string, model: any) => {
    return axios
        .patch(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError);
}


const remove = (resource: string, id: string) => {
    return axios
        .delete(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
    remove
}