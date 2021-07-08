import config from 'config';
import {postRequest,postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import sha256 from "sha256";
import Cookies from "js-cookie";
import moment from "moment";



export const login = (data) => {
    const url = `${config.apiUrl}/login`;

    const token = sha256(data.username + data.password + moment().format())
    const remember = data.remember;
    data.cookie = token;

    const callback = (data) => {
        if(data.status >= 0) {
            let bool = [true,false];
            console.log("LOGIN DATA", data)
            localStorage.setItem('user', JSON.stringify(data.data));
            localStorage.setItem('manager',JSON.stringify(bool[data.data.userType]));
            if(remember)
                Cookies.set("remember",token,{expires:7})
            history.push("/",{auth:true});
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const cookieLogin = (data) => {
    const url = `${config.apiUrl}/checkCookie`;

    const callback = (data) => {
        console.log(data)

        if(data.status >= 0) {
            history.push("/",{auth:true});
         }
        else{
            message.error(data.msg);
        }
    };
    postRequest_v2(url, data, callback);
}

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
            Cookies.remove("remember")
        }
        else{
            message.error(data.msg);
        }
    };
    const {userId} = JSON.parse(localStorage.getItem("user"));
    postRequest_v2(url, {id:userId}, callback);
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

export const deleteUser = (data) => {
    const callback = (data) => {
        if(data.status >= 0) {
             message.success(data.msg);
             window.location.reload();
        }
        else{
            message.error(data.msg);
        }
    }
    const url = `${config.apiUrl}/deleteUser`;
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