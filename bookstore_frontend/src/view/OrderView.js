import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {SearchBar} from "../components/SearchBarEdit";
import OrderManagement from "../components/OrderManagementEdit";
import { getOrders} from "../services/orderService";

const { Header, Content } = Layout;

class OrderView extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({orderData:[],query:"",filterDates:[]})
    }

    componentDidMount() {
        const callback =  (data) => {
            this.setState({orderData:data});
        };
        const {userId} = JSON.parse(localStorage.getItem("user"));
        getOrders({id:userId},callback)
    }


    render(){

        const callback = (data) => {
            if(data.data !== undefined){
                this.setState({orderData:data.data});
            }
            if(data.filterDates !== undefined){
                this.setState({filterDates:data.filterDates});
            }
            if(data.query !== undefined){
                this.setState({query:data.query})
            }
        }


        const {orderData,query,filterDates} = this.state;

        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <SearchBar callback={callback}  data = {orderData} entity = "Order" manager = {false} filterDates = {filterDates}/>
                            <OrderManagement callback ={callback} data = {orderData} query ={query} manger ={false} />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(OrderView);