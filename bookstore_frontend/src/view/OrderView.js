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

class OrderView extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({orderData:[]})
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.location.key !== prevProps.location.key){
        }

    }

    render(){

        const callback = (data) => {
            this.setState({orderData:data});
        }

        const {orderData} = this.state;
        const {userId,userType} = JSON.parse(localStorage.getItem("user"));

        const curTab = sessionStorage.getItem("currentTab")
        const userOrderId = curTab === "\"8\""? 0:userId;
        const curTabParse = curTab === "\"8\""? 8:3;
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <SearchBar callback={callback} entity = "Order" userOrderId ={userOrderId}/>

                            <OrderManagement data = {orderData} manager={false}/>
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