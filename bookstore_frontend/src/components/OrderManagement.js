import React, {useEffect, useState} from 'react';
import {List, message, DatePicker} from 'antd';
import {getOrders} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import {format} from "date-fns";
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';


import {Link} from "react-router-dom";

function DateFormat (date){
    let oldDate = new Date(date);
    return format(oldDate,' MMMM do, yyyy');

}



const OrderManagement = (props) => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [hasMore,setHasMore] = useState(true);
    const [filterDates,setFilterDates] = useState([]);


    useEffect(()=>{
        // retrieveData();
    },[])
    useEffect(()=>{
        setData(props.data)
    },[props])



    const handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        if (data.length > 5) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
    };

    const handleFilter=(val) => {
        setFilterDates(val);
    }

    const filterOrders =() =>{
        if (filterDates.length === 0) {
            return data
        }
        return data.filter(order => moment(order.purchaseDate).isBetween(filterDates[0], filterDates[1],'day','[]'))
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
                </div>
                {
                    filterOrders(filterDates,data).length ?

                    <InfiniteScroll
                        className="order-list"
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => {
                            handleInfiniteOnLoad()
                        }}
                        hasMore={!loading && hasMore}
                        useWindow={false}
                    >

                        <List
                            dataSource={filterOrders(filterDates,data)}
                            renderItem={item => (
                                <List.Item className="list-item">
                                    <List.Item.Meta title={"Order #" + item.orderId + DateFormat(item.purchaseDate) + " Purchased by: " + item.buyerUsername}
                                                    description={
                                                        <div>
                                                            <List
                                                                dataSource={item.books}
                                                                renderItem={book => (
                                                                    <List.Item className={"order-item"}>
                                                                        <Link to={{
                                                                            pathname: '/bookDetails',
                                                                            search: '?id=' + book.bookId
                                                                        }}
                                                                              target="_blank"
                                                                        >
                                                                            <div className="book-image">
                                                                                {<img alt="image" src={book.image}
                                                                                      className={"bookImg-Order"}/>}
                                                                            </div>
                                                                        </Link>
                                                                        <List.Item.Meta description={
                                                                            <div>
                                                                                <Link to={{
                                                                                    pathname: '/bookDetails',
                                                                                    search: '?id=' + book.bookId
                                                                                }}
                                                                                      target="_blank"
                                                                                >
                                                                                    {book.title}
                                                                                </Link>
                                                                                <div>
                                                                                    {item.receiver}
                                                                                    <br/>
                                                                                    {item.shipping}
                                                                                    <br/>
                                                                                    {item.phone}
                                                                                </div>
                                                                                <div>
                                                                                    Qty: {book.qty}
                                                                                </div>
                                                                            </div>
                                                                        }/>

                                                                    </List.Item>
                                                                )}
                                                            />


                                                        </div>
                                                    }/>
                                </List.Item>
                            )}
                        >
                        </List>
                    </InfiniteScroll>
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
