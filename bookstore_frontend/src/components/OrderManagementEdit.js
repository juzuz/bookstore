import React, {useEffect, useState} from 'react';
import {List, DatePicker,Button} from 'antd';
import { getOrdersByQueryAndDateAndUserAndPage,deleteOrder} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import moment from 'moment-timezone';


import {Link} from "react-router-dom";

function DateFormat (date){
    return moment(date).format("MMM DD, YYYY")

}



const OrderManagement = (props) => {

    const [data,setData] = useState([]);
    const [pageInfo,setPageInfo] = useState({});
    const [filterDates,setFilterDates] = useState([]);
    const [curPage,setCurPage] = useState(1);

    const retrieveData =(value)=> {
        const callback = data => {
            setData(data);
            setPageInfo(data);
            props.callback({data:data})
        }
        if(props.manager)
        {
            getOrdersByQueryAndDateAndUserAndPage( {id:0,query: props.query,filterDates: filterDates,},callback)

        }
        else{
            const {userId} = JSON.parse(localStorage.getItem("user"));
            getOrdersByQueryAndDateAndUserAndPage( {id:userId,query: props.query,filterDates: filterDates,},callback)
        }
    }

    useEffect(()=>{
        retrieveData();
    },[])

    useEffect(() => {
        if(props.data.length !== 0) {
            setData(props.data.content);
            setPageInfo(props.data);
            setCurPage(1);
        }
        else{
            setData([])
        }
    },[props.data])



    const handleFilter=(val) => {
        setFilterDates(val);
        props.callback({filterDates:val});
    }

    const handleApply = () => {
        const callback = data => {
            props.callback({data:data})
            setCurPage(1);
        }
        const {userId} = JSON.parse(localStorage.getItem("user"));
        let id = props.manager?0:userId;
        getOrdersByQueryAndDateAndUserAndPage( {id:id,query: props.query,filterDates: filterDates,},callback)
    }




    const {RangePicker} = DatePicker;
    return (
        <div>
            <div className="purchase-container">
                <div className ="purchase-title-container">
                    <div className="purchase-title">Purchases</div>
                </div>
                <div style={{display:"flex",marginTop:"10px",flexDirection:"column"}}>
                    <div>Filters</div>
                    <RangePicker onChange={val=>handleFilter(val)}/>
                    <Button onClick={() =>handleApply()}>Apply Filter</Button>
                </div>
                {
                    data.length ?
                    <List
                        dataSource={data.sort((a,b) => b.orderId - a.orderId)}
                        pagination={{
                            showQuickJumper:true,
                            onChange: page => {
                                setCurPage(page);
                                const callback = data => {
                                    setData(data.content);
                                    setPageInfo(data);
                                }
                                const {userId} = JSON.parse(localStorage.getItem("user"));
                                let id = props.manager?0:userId;
                                getOrdersByQueryAndDateAndUserAndPage( {id:id,query: props.query,filterDates: filterDates,page:page-1},callback)
                            },
                            pageSize: 5,
                            total:pageInfo.totalElements,
                            current:curPage
                        }}
                        renderItem={item => (
                            <List.Item className="list-item">
                                <List.Item.Meta title={"Order #" + item.orderId + DateFormat(item.orderDate) + " Purchased by: " + item.buyer}
                                                description={
                                                    <div style={{display:"flex",flexDirection:"column"}}>
                                                        <List
                                                            dataSource={item.orderItems}
                                                            renderItem={orderItems => (
                                                                <List.Item className={"order-item"}>
                                                                    <Link to={{
                                                                        pathname: '/bookDetails',
                                                                        search: '?id=' + orderItems.bookId
                                                                    }}
                                                                          target="_blank"
                                                                    >
                                                                        <div className="book-image">
                                                                            {<img alt="image" src={orderItems.book.image}
                                                                                  className={"bookImg-Order"}/>}
                                                                        </div>
                                                                    </Link>
                                                                    <List.Item.Meta description={
                                                                        <div>
                                                                            <Link to={{
                                                                                pathname: '/bookDetails',
                                                                                search: '?id=' + orderItems.book.bookId
                                                                            }}
                                                                                  target="_blank"
                                                                            >
                                                                                {orderItems.book.name}
                                                                            </Link>

                                                                            {
                                                                                item.address !== null?
                                                                                    <div>
                                                                                        {item.address.name}
                                                                                        <br/>
                                                                                        {item.address.address}
                                                                                        <br/>
                                                                                        {item.address.phone}
                                                                                    </div>
                                                                                        : <div>
                                                                                        {item.addressBackup.split("@")[0]}
                                                                                        <br/>
                                                                                        {item.addressBackup.split("@")[1]}
                                                                                        <br/>
                                                                                        {item.addressBackup.split("@")[2]}
                                                                                    </div>

                                                                                        }

                                                                                    <div>
                                                                                        Qty: {orderItems.quantity}
                                                                                    </div>
                                                                        </div>
                                                                    }/>

                                                                </List.Item>
                                                            )}
                                                        />
                                                        {
                                                            props.manager?<Button onClick={
                                                                ()=>deleteOrder({id:item.orderId})
                                                            }>Remove</Button>:null
                                                        }
                                                    </div>
                                                }/>
                            </List.Item>
                        )}
                    >
                    </List>
                :
                    <div>
                    <div className={"empty-order"}></div>
                    <div className="cart-empty-text">
                        Your order history is looking lonely!
                        <br/> Continue shopping on our
                        <Link className="ab" to={{
                            pathname: '/',}}
                        > bookstore homepage </Link>
                        and explore from our quality books!
                    </div>
                    </div>
                }
            </div>



        </div>
    );
};

export default OrderManagement;
