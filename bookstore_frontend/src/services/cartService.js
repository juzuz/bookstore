import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const getCart = (id, callback) => {
    const data = {userId: id};
    const url = `${config.apiUrl}/getCart`;
    postRequest_v2(url, data, callback);
};

export const updateQuantity = (data, callback) => {
    const url = `${config.apiUrl}/updateQuantity`;
    postRequest_v2(url, data, callback)
}

export const deleteItem = (data, callback) => {
    const url = `${config.apiUrl}/deleteCartItem`;
    postRequest_v2(url, data, callback)
}
export const addToCart = (data, callback) => {
    const url = `${config.apiUrl}/addToCart`;
    postRequest_v2(url, data, callback)
}
