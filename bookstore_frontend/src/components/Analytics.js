import React, {useEffect, useState} from 'react';
import {List, message, DatePicker, Button,Card} from 'antd';
import {getBooks} from '../services/bookService';
import {getOrders} from "../services/orderService";
import "../css/orderManagement.css";
import "../css/order.css"
import {format} from "date-fns";
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import {getUsers} from "../services/userService";



function DateFormat (date){
    let oldDate = new Date(date);
    return format(oldDate,' MMMM do, yyyy');

}



const Stats = (props) => {

    const [userList,setUserList] = useState([]);
    const [allData,setAllData] = useState([]);
    const [bookList,setBookList] = useState([]);
    const [purchaseSalesToggle,setPurchaseSalesToggle] = useState(true);
    const [loading,setLoading] = useState(true);
    const [hasMore,setHasMore] = useState(true);
    const [filterDates,setFilterDates] = useState([]);
    const {RangePicker} = DatePicker;

    const retrieveData = () => {
        const {userId,userType} = JSON.parse(localStorage.getItem("user"));


        const orderCallback = (values) => {
            setAllData(values)
        }
        const bookCallback = (values) => {
            setBookList(values)
        }
        const userCallback = (values) => {
            setUserList(values)
        }

        getBooks({include:true},bookCallback)
        getOrders({id:0},orderCallback);
        getUsers({type:-1},userCallback)

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
        if (allData.length > 5) {
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

    const handleClick = () => {
        setPurchaseSalesToggle(!purchaseSalesToggle)
    }

    const filterNRankData = () => {
        let temp = filterDates.length===0?allData: allData.filter(order => moment((order.purchaseDate)).isBetween(filterDates[0], filterDates[1],'day','[]'))

        let rank = purchaseSalesToggle?Array(bookList.length).fill(0):Array(userList.length).fill(0);
        purchaseSalesToggle?
            (
                temp.map((item)=>{
                    item.books.map(item=>{
                        rank[item.bookId-1] +=item.qty;
                    })
                })
            )
            :
            (
                temp.map((item)=>{
                    let userId = item.buyerId;
                    item.books.map(item=>{
                        rank[userId-1] +=(item.qty * item.price) ;
                    })
                })
            )


        let result = purchaseSalesToggle?
            (
                Array.from(Array(rank.length).keys())
                    .sort((a, b) => rank[a] > rank[b] ? -1 : (rank[b] < rank[a]) | 0)
            )
            :
            (
                Array.from(Array(rank.length).keys())
                    .sort((a, b) => rank[a] > rank[b] ? -1 : (rank[b] < rank[a]) | 0)
            )

        let final = Array(result.length);
        purchaseSalesToggle?
            (
                result.map((v,i) => {
                    if(i==0){
                        final[0] = {numBook:0,sum:0}
                    }
                    final[i+1] = {book: bookList[result[i]], qty:rank[result[i]]}
                    final[0].numBook+=final[i+1].qty;
                    final[0].sum += final[i+1].book.price * final[i+1].qty;
                })
            )
            :
            (
                result.map((v,i) => {
                    if(i==0){
                        final[0] = {totalEarning:rank.reduce((a, b) => a + b, 0)}
                    }
                    final[i+1] = {user: userList[result[i]], spent: rank[result[i]]}
                })
            )
        return final
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
                                    {
                                        purchaseSalesToggle?
                                            <div style={{display:'flex'}}>
                                                {
                                                    idx == 0?
                                                        <List.Item.Meta
                                                            title = {"Activity Summary"}
                                                            description={
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    <div>

                                                                        {
                                                                            filterDates.length?
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
                                            :
                                            <div style={{display:'flex'}}>
                                                {
                                                    idx == 0?
                                                        <List.Item.Meta
                                                            title = {"User Summary"}
                                                            description={
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    <div>

                                                                        {
                                                                            filterDates.length?
                                                                                "Date Span:" + moment(filterDates[0]).format("MMM Do YYYY") + " through " + moment(filterDates[1]).format("MMM Do YYYY")
                                                                                :
                                                                                "Date Span: To this date"
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        Total Sales: {item.totalEarning}
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
                                                                title = {item.user.username}
                                                                description={<div>
                                                                    {item.spent}
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
                    </InfiniteScroll>
                </Card>
            </div>
        </div>
    );
};

export default Stats;
