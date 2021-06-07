import config from 'config';
import {postRequest,postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';



export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if(data.status >= 0) {
            let bool = [true,false];
            localStorage.setItem('user', JSON.stringify(data.data));
            localStorage.setItem('manager',JSON.stringify(bool[data.data.userType]));
            history.push("/");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const getUser = (data,callback) => {
    const url = `${config.apiUrl}/getUser`;
    postRequest_v2(url,data,callback)
}

export const setLock = (data) => {
    const url = `${config.apiUrl}/setLock`;
    postRequest_v2(url,data)
}

export const getUsers = (data,callback) => {
    const url = `${config.apiUrl}/getUsers`;
    postRequest_v2(url,data,callback)
}

export const register = (data) =>{
    const url = `${config.apiUrl}/register`;
    const callback = (data) => {
        if(data.status >= 0) {
            message.success(data.msg);
            history.push("/login");
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest_v2(url,data,callback)
}


export const getAddress = (data,callback) => {
    const url = `${config.apiUrl}/getAddress`;
    postRequest_v2(url,data,callback)
}

export const addAdd = (data,callback) => {
    const url = `${config.apiUrl}/addAddress`;

    postRequest_v2(url,data,callback)
}

export const removeAddress = (data,callback) =>{
    const url = `${config.apiUrl}/removeAddress`;
    postRequest_v2(url,data,callback)
}