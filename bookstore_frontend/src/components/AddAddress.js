import React from 'react';
import "../css/address.css";

import WrappedAddressForm from "./AddressForm";



const AddAddress = () => {




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