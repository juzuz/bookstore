import React, {useEffect, useState} from 'react';
import {getUser} from "../services/userService";
import {Card} from "antd";
import '../css/profile.css';

const MyProfile = () => {

    const [userData,setUserData] = useState([]);
    const [imgUrl,setImgUrl] = useState("");

    const retrieveData = user =>{
        let data = {userId: user.userId}
        const callback = value =>{
            try{
                setImgUrl(require("../assets/" + value.username + ".jpg"));
            } catch (err){
                setImgUrl(require("../assets/default.png"));
            }
            setUserData(value);
        }
        getUser(data,callback);
    }

    useEffect(()=>{
        retrieveData(JSON.parse(localStorage.getItem('user')));
    },[])


    return (
        <div className='profile-container'>
            <Card className="profile-card">
                <img className ="profile-pic" src={imgUrl}/>
                <div className ="profile-name">{userData.name}</div>
                <div className="profile-info">
                    <div className="profile-username">{userData.username}</div>

                    <div className='profile-tel'>{ userData.tel === ""?
                        "Telephone #: Yet Confirmed" : "Telephone #: " + userData.tel
                    }</div>
                    <div className='profile-tel'>{ userData.email === ""?
                        "Email #: Yet Confirmed" : "Email: " + userData.email
                    }</div>

                </div>
            </Card>
        </div>
    );
};

export default MyProfile;