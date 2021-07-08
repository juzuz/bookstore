import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import Analytics from "../components/Analytics";

const { Header, Content } = Layout;

class ManagerAnalyticView extends React.Component{


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
                            <Analytics />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(ManagerAnalyticView);