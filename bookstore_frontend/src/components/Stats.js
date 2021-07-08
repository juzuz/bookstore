import React, {useEffect, useState} from 'react';
import {List, DatePicker,Card} from 'antd';
import {getOrdersByUserAndDate} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import moment from 'moment';




const Stats = (props) => {

    const [data,setData] = useState([]);

    const [loading,setLoading] = useState(true);
    const [filterDates,setFilterDates] = useState([]);
    const {RangePicker} = DatePicker;

    const retrieveData = (val) => {
        const {userId} = JSON.parse(localStorage.getItem("user"));

        const callback = (values) => {
            setData(values)
        }

        getOrdersByUserAndDate({id:userId,dates:val},callback);
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

    const rankData = () => {
        let rank = {};
        data.map((order) => {
            order.orderItems.map((item) => {
                if(rank[item.bookId] === undefined){
                    rank[item.bookId] = {book:item.book,qty:item.quantity};
                }
                else{
                    rank[item.bookId].qty = rank[item.bookId].qty +item.quantity;
                }
            })
        })

        let sum = 0;
        let quant = 0;



        let ranked = [];
        for ( const n in rank){
            ranked.push(rank[n]);
            sum += rank[n].book.price * rank[n].qty;
            quant += rank[n].qty;
        }
        ranked.sort((a,b) => b.qty  -a.qty)

        ranked = [{total: quant, sum: sum},...ranked]
        return ranked
    }


    return (

        <div>
            <div className="purchase-container">
                <div className ="purchase-title-container" style={{display:'flex',justifyContent:'space-between'}} >
                    <div className="purchase-title">Purchase Analytics</div>

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
                                            <div style={{display:'flex'}}>

                                                {
                                                    idx == 0?
                                                        <List.Item.Meta
                                                            title = {"Activity Summary"}
                                                            description={
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    <div>

                                                                        {
                                                                            filterDates.length ?
                                                                            "Date Span:" + moment(filterDates[0]).format("MMM Do YYYY") + " through " + moment(filterDates[1]).format("MMM Do YYYY")
                                                                            :
                                                                            "Date Span: No Dates Selected"
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        Number of books purchased: {item.total}
                                                                    </div>
                                                                    <div>
                                                                        Total Spent: {item.sum.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            }
                                                        />

                                                        :
                                                        <div style={{display:'flex'}}>
                                                            <div>
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
