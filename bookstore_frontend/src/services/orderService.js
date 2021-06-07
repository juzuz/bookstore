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

export const submitOrder = (data) => {
    const url = `${config.apiUrl}/submitOrder`;

    postRequest_v2(url, data,callback);
}

export const submitOrders = (data) => {
    const url = `${config.apiUrl}/submitOrders`;

    postRequest(url, data,callback);
}

export const getOrders = ( data,callback) => {
    const url = `${config.apiUrl}/getOrders`;
    postRequest_v2(url, data, callback);
};

