import React, {useEffect, useState} from 'react';
import {List, DatePicker, Button,Card} from 'antd';
import { getOrdersByDate} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import moment from 'moment';




const Stats = (props) => {

    const [data,setData] = useState([]);
    const [purchaseSalesToggle,setPurchaseSalesToggle] = useState(true);
    const [loading,setLoading] = useState(true);
    const [filterDates,setFilterDates] = useState([]);
    const {RangePicker} = DatePicker;

    const retrieveData = (val) => {

        const callback = (values) => {
            setData(values)
        }

        getOrdersByDate({dates:val},callback);
    }

    useEffect(()=>{
        setLoading(true)
        retrieveData(filterDates);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    },[])


    const handleFilter=(val) => {
        setFilterDates(val);
        retrieveData(val);
    }

    const handleClick = () => {
        setPurchaseSalesToggle(!purchaseSalesToggle)
    }

    const rankData = () => {
        let rank = {};
        purchaseSalesToggle?(
        // Returns book hot ranking in form of Object {book: {info on the book}, qty: number of purchases}
            data.map((order) => {
                order.orderItems.map((item) => {
                    if(rank[item.bookId] === undefined){
                        rank[item.bookId] = {book:item.book,qty:item.quantity};
                    }
                    else{
                        rank[item.bookId].qty = rank[item.bookId].qty +item.quantity;
                    }
                })
            }))
            :
            (
                // Returns user Ranking in form of object {user: username of buyer, spent: totalSpending}
                data.map(order=>{
                if(rank[order.buyer] === undefined){
                    let sum = 0;
                    order.orderItems.map(item=>{
                        sum += item.book.price * item.quantity;
                    })
                    rank[order.buyer] = sum;
                }
                else{
                    let sum = 0;
                    order.orderItems.map(item=>{
                        sum += item.book.price * item.quantity;
                    })
                    rank[order.buyer] += sum;
                }
            }))

        let ranked = [];

        // Idx 0 of list will always be the summary of the ranking.
        if(purchaseSalesToggle) {
            let sum = 0;
            let quant = 0;
            for ( const n in rank){
                ranked.push(rank[n]);
                sum += rank[n].book.price * rank[n].qty;
                quant += rank[n].qty;
            }
            ranked.sort((a,b) => b.qty  -a.qty)
            ranked = [{total: quant, sum: sum},...ranked]
        }
        else{
            let totalEarning = 0;

            for( const n in rank){
                ranked.push({user:n, spent:rank[n]});
                totalEarning+=rank[n];
            }
            ranked.sort((a,b) => b.spent - a.spent)
            ranked = [{totalEarning:totalEarning},...ranked]
        }

        return ranked;
    }





    return (

        <div>
            <div className="purchase-container">
                <div className ="purchase-title-container" style={{display:'flex',justifyContent:'space-between'}} >
                    <div className="purchase-title">{purchaseSalesToggle?"Analytics of User":"Analytics of All User"}</div>
                    <Button onClick={()=>handleClick()}  > {purchaseSalesToggle?" Switch to User Ranking":" Switch to Book Ranking"}</Button>

                </div>
                <div style={{display:"flex",marginTop:"10px",flexDirection:"column"}}>
                    <div>Filters</div>
                    <RangePicker onChange={val=>handleFilter(val)}/>
                </div>


                <Card loading = {loading}>

                        <List
                            dataSource={rankData()}
                            renderItem={(item,idx) => (
                                <List.Item className="list-item">
                                    {
                                        purchaseSalesToggle?
                                            <div style={{display:'flex'}}>
                                                {
                                                    idx === 0?
                                                        <List.Item.Meta
                                                            title = {"Activity Summary"}
                                                            description={
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    <div>

                                                                        {
                                                                            filterDates.length?
                                                                                "Date Span:" + moment(filterDates[0]).format("MMM Do YYYY") + " through " + moment(filterDates[1]).format("MMM Do YYYY")
                                                                                :
                                                                                "Date Span: No Dates Selected"
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        Number of books purchased: {item.total}
                                                                    </div>
                                                                    <div>
                                                                        Total Spent: {"$ " + item.sum.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            }
                                                        />
                                                    :
                                                    <div style={{display:'flex'}}>
                                                        <div style ={{fontSize:"20px", paddingRight:"10px"}}>
                                                            {"#" + (idx)}
                                                        </div>
                                                        <List.Item.Meta
                                                            avatar={<img alt="image" src={item.book.image} style={{width:"100px",height:"100px",flex:2}}/>}
                                                            title = {item.book.name}
                                                            description={
                                                                <div style = {{display:"flex",flexDirection:'row'}}>
                                                                    <div style={{width:"500px"}} >
                                                                        <div>Author: {item.book.author}</div>
                                                                        <div>Category: {item.book.type}</div>
                                                                    </div>
                                                                    <div style={{width:"100%"}}>
                                                                        {"Purchases: "+ item.qty}
                                                                    </div>
                                                                </div>
                                                            }
                                                        />
                                                    </div>
                                                }

                                            </div>
                                            :
                                            <div style={{display:'flex'}}>
                                                {
                                                    idx === 0?
                                                        <List.Item.Meta
                                                            title = {"User Summary"}
                                                            description={
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    <div>

                                                                        {
                                                                            filterDates.length?
                                                                                "Date Span:" + moment(filterDates[0]).format("MMM Do YYYY") + " through " + moment(filterDates[1]).format("MMM Do YYYY")
                                                                                :
                                                                                "Date Span: No Dates Selected"
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        Total Sales: {"$ " + item.totalEarning.toFixed(2) }
                                                                    </div>

                                                                </div>
                                                            }
                                                        />
                                                        :
                                                        <div style={{display:'flex'}}>
                                                            <div style ={{fontSize:"20px", paddingRight:"10px"}}>
                                                                {"#" + (idx)}
                                                            </div>
                                                            <List.Item.Meta
                                                                title = {item.user}
                                                                description={<div>
                                                                    {item.spent.toFixed(2)}
                                                                </div>}
                                                            />
                                                        </div>
                                                }

                                            </div>
                                    }
                                </List.Item>
                            )}
                        >
                        </List>
                </Card>
            </div>
        </div>
    );
};

export default Stats;
