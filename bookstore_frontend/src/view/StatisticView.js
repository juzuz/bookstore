import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import OrderManagement from "../components/OrderManagement";
import {history} from "../utils/history";
import Stats from "../components/Stats";

const { Header, Content } = Layout;

class StatisticView extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }



    render(){


        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar  />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <Stats />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(StatisticView);