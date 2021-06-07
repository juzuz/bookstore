import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
// import {OrderManagement} from "../components/OrderManagement";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";
import OrderManagement from "../components/OrderManagement";
import {history} from "../utils/history";

const { Header, Content, Footer } = Layout;

class OrderManagementView extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({orderData:[]})
    }



    render(){

        const callback = (data) => {
            this.setState({orderData:data});
        }

        const {orderData} = this.state;
        const {userId,userType} = JSON.parse(localStorage.getItem("user"));


        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <SearchBar callback={callback} entity = "Order" manager = {true}/>
                            <OrderManagement data = {orderData} />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(OrderManagementView);