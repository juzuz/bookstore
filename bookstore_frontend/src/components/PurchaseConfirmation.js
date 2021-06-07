import React, {useEffect, useState} from 'react';
import {Button, Card, Divider,Row,Col,List} from "antd";
import {submitOrder,submitOrders} from "../services/orderService";
import "../css/receipt.css";
import {getAddress} from "../services/userService";
import InfiniteScroll from 'react-infinite-scroller';
import WrappedAddressForm from "./AddressForm";

function renderItems(data){
    return (
        <div>
        <Row justify='space-between'>

            <Col span={6} >{data.title}</Col>
            <Col span={8}/>
            <Col span={3} >{data.quantity}</Col>

            <Col span={3} >{data.price.toFixed(2)}</Col>


            <Col span={3} >{(data.quantity * data.price).toFixed(2)}</Col>

        </Row>
        <Divider/>
        </div>
    )
}


function  calcSum(data)
{
    let i,total = 0;
    for (i = 0; i < data.length; i++) {

            total += data[i].price * data[i].quantity;
    }

    return total.toFixed(2);
}


const PurchaseConfirmation = (props) => {
    const [address,setAddress] = useState([]);
    const [shippingAddress, setShippingAddress] = useState("");

    const handlePurchase = () => {
        let i;
        let data = props.data.data;
        for (i = 0; i < data.length; i++) {
            delete data[i]['price'];
            delete data[i]['title'];
            data[i].address = shippingAddress;
        }
        submitOrders(data);
    }

    useEffect(()=>{
        const callback = value => {
            setAddress(value)
            console.log(value)
        }
        let data = {userId :JSON.parse(localStorage.getItem('user')).userId}
        getAddress(data,callback)
    },[])

    const callback= (data) => {
        setShippingAddress(data);
    }

    return (
            <div className={'info-container'}>
                <div className="address-selector-title">Select an Address</div>
                {address.length  ?
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}

                    >
                        <List dataSource={address}
                              grid={{ gutter: 20, column: 3 }}
                              renderItem={item => (
                                  <List.Item>
                                      <Card title={item.name}>
                                          {item.address}
                                          <br/>
                                          {"Phone #: " + item.phone}
                                          <br/>
                                          <Button onClick={()=>setShippingAddress(item)}>
                                              Use this Address
                                          </Button>
                                      </Card>

                                  </List.Item>
                              )}
                        >

                        </List>
                    </InfiniteScroll> :
                    <div>
                        {shippingAddress === ""?
                            <div>
                            <div style={{fontSize:"20px",textAlign:"center"}}>Use a new Address</div>
                                < WrappedAddressForm type={"receipt"} callback={callback}/>
                            </div>
                            :null
                        }
                    </div>
                }
                {address.length || shippingAddress!== "" ?
                    <div>
                    <Card className="receipt-card">
                        <div className='personal-info'>
                            {shippingAddress.name}

                        </div>
                        <div className="receipt-info">
                            {shippingAddress.address}
                            <br/>
                            {shippingAddress.phone}
                        </div>
                        <div className='receipt-title'>
                            Receipt
                        </div>
                        <div className="receipt-col">
                            <Row justify='space-between'>

                                <Col span={6} className="r-title">Product</Col>
                                <Col span={8}/>
                                <Col span={3} className="r-quantity">#</Col>
                                <Col span={3} className="r-price">Price</Col>
                                <Col span={3} className="r-sum">Total</Col>
                            </Row>
                        </div>
                        <div className='purchase-info'>
                            <Divider/>
                            {
                                props.data.data.map(item => renderItems(item))
                            }

                        </div>


                        <div className='sum'> {"Subtotal: ¥" + calcSum(props.data.data)}</div>


                    </Card>{
                        shippingAddress === ""?null:
                    <Button className='confirm-button' type="primary" shape="round" size={'large'} onClick={() => {
                        handlePurchase()
                    }}>
                        Purchase
                    </Button>
                    }

                    </div>:null
                }
            </div>
    );
};

export default PurchaseConfirmation;