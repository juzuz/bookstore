import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    postRequest_v2(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);

};

export const updateBook = (data,callback) => {
    const url = `${config.apiUrl}/updateBook`;
    postRequest_v2(url,data,callback)
}

export const setRemoved = (data,callback) => {

    const url = `${config.apiUrl}/setRemoved`;
    postRequest_v2(url,data,callback);
}

export const addBook = (data,callback) => {
    const url = `${config.apiUrl}/addBook`;
    postRequest_v2(url,data,callback);
}