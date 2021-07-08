import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from "../utils/history";
import {message} from "antd";


const callback = (data) =>{
    if(data.status >= 0) {
        history.push({pathname: '/order',selKeys: ['3']});
        message.success(data.msg);
    }
    else{
        message.error(data.msg);
    }
}

export const submitOrders = (data) => {
    const url = `${config.apiUrl}/submitOrders`;
    console.log("ORDER INFO:",data)
    postRequest(url, data,callback);
}

export const getOrders = ( data,callback) => {
    const url = `${config.apiUrl}/getOrders`;
    postRequest_v2(url, data, callback);
};

export const getOrdersByUserAndDate = (data,callback) => {
    const url = `${config.apiUrl}/getOrdersByUserAndDate`;
    postRequest_v2(url, data, callback);
}

export const getOrdersByDate = (data,callback) => {
    const url = `${config.apiUrl}/getOrdersByDate`;
    postRequest_v2(url, data, callback);
}

export const getOrdersByQueryAndDateAndUserAndPage = (data,callback) => {
    const url = `${config.apiUrl}/getOrdersByQueryAndDateAndUserAndPage`;
    postRequest_v2(url, data, callback);
}

export const deleteOrder = (data) => {
    const callback = () => {
        window.location.reload();
    }
    const url = `${config.apiUrl}/deleteOrder`;
    postRequest_v2(url, data, callback);
}
