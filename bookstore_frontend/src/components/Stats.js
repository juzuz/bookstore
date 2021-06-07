import React, {useEffect, useState} from 'react';
import {List, message, DatePicker, Button,Card} from 'antd';
import {getBooks} from '../services/bookService';
import {getOrders} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import {format} from "date-fns";
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';



function DateFormat (date){
    let oldDate = new Date(date);
    return format(oldDate,' MMMM do, yyyy');

}



const Stats = (props) => {

    const [data,setData] = useState([]);
    const [bookList,setBookList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [hasMore,setHasMore] = useState(true);
    const [filterDates,setFilterDates] = useState([]);
    const {RangePicker} = DatePicker;

    const retrieveData = () => {
        const {userId,userType} = JSON.parse(localStorage.getItem("user"));

        const callback = (values) => {
            setData(values)
        }

        const bookCallback = (values) => {
            setBookList(values)
        }
        getBooks({include:true},bookCallback)
        getOrders({id:userId},callback);
    }

    useEffect(()=>{
        setLoading(true)
        retrieveData();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    },[])


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


    const filterNRankData = () => {


        let temp = filterDates.length===0?data: data.filter(order => moment((order.purchaseDate)).isBetween(filterDates[0], filterDates[1],'day','[]'))


        let rank = Array(bookList.length).fill(0);
        temp.map((item)=>{
            item.books.map(item=>{
                rank[item.bookId-1] +=item.qty;
            })
        })

        let subCount = rank.filter(x=> x!==0).length;

        let result = Array.from(Array(rank.length).keys())
            .sort((a, b) => rank[a] > rank[b] ? -1 : (rank[b] < rank[a]) | 0).slice(0,subCount);


        let final = Array(result.length);
        result.map((v,i) => {
            if(i==0){
                final[0] = {numBook:0,sum:0}
            }
            final[i+1] = {book: bookList[result[i]], qty:rank[result[i]]}
            final[0].numBook+=final[i+1].qty;
            final[0].sum += final[i+1].book.price * final[i+1].qty;
        })

        return final
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
                                    dataSource={filterNRankData()}
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
                                                                            "Date Span: To this date"
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        Number of books purchased: {item.numBook}
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
                            </InfiniteScroll>
                        </Card>


            </div>
        </div>
    );
};

export default Stats;
