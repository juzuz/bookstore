import React, {useEffect, useState} from 'react';
import {getAddress,removeAddress} from "../services/userService";
import {Card} from "antd";
import '../css/address.css';
import {PlusOutlined } from "@ant-design/icons";
import {history} from "../utils/history";

const Address = () => {

    const [address,setAddress] = useState([]);

    const retrieveData = id => {
        const callback = value => {
            setAddress(value)
            console.log(value)
        }
        let data = {userId :id.userId}
        getAddress(data,callback)
    }

    useEffect(()=>{
        retrieveData(JSON.parse(localStorage.getItem('user')));
    },[])

    const handleNewAddress = (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        history.push('/newAddressView')
    }

    const removeHandler=id=>{
        let data = {
            addressId:id
        }
        const callback = (status) => {
            window.location.reload();
        }
        removeAddress(data,callback);
    }


    return (
        <div className='profile-container'>
            <div className ="address-title-container">
                <div className="address-title">Your Shipping Addresses</div>

            </div>

            <div className="address-card-container">
                <div className="address-card-margin">
                <div className = "new-address-card" onClick={(e)=>handleNewAddress(e)}>
                    <div className="new-address-card-content">
                    <PlusOutlined style={{
                        fontSize:"50px",
                        color:"#a7a7a7"
                    }}/>
                    <div style={{
                        fontSize:"20px",
                        fontWeight:"bold"
                    }}>Add Address</div>
                    </div>
                </div>
                </div>
                {
                    address && address.map(value => (
                        <div className="address-card-margin">
                            <div className = "address-card" >
                                <div className="address-card-content">
                                    <div>
                                    <div style={{
                                        fontSize:"18px",
                                        fontWeight:"bold"
                                    }}>
                                        {value.name}
                                    </div>

                                    <div style={{
                                        fontSize:"14px",
                                    }}>
                                        {value.address}
                                    </div>
                                    <div style={{
                                        fontSize:"14px",
                                    }}>
                                        Phone number: {value.phone}
                                    </div >
                                    </div>
                                    <div style={{display:"flex",marginTop:"90px"}}>
                                        <div style={{
                                            fontSize:"14px",
                                            color:"#007185"
                                        }}
                                        onClick={()=>removeHandler(value.addressId)}
                                        >
                                            Remove
                                        </div>
                                        <div>|</div>
                                        <div style={{
                                            fontSize:"14px",
                                            color:"#007185"
                                        }}>
                                            Edit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Address;