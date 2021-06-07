import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Input, Icon, Checkbox} from "antd";
import "../css/address.css";

import WrappedAddressForm from "./AddressForm";



const AddAddress = () => {

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [add,setAdd] = useState("");

    const textHandler = (type,val) => {
        if(type ==="name")
            setName(val)
        if(type==="phone")
            setPhone(val)
        if(type==="add")
            setAdd(val)
    }




    return (
            <div className={'info-container'}>
                <div className='receipt-title'>
                    Add a new address
                </div>
                <WrappedAddressForm type={"console"}/>
            </div>
    );
};

export default AddAddress;