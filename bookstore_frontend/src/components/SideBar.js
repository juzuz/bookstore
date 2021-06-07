import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import {history} from "../utils/history";


const { SubMenu } = Menu;
const { Sider } = Layout;

export class SideBar extends React.Component {

    state = {
        collapsed: false,
        selKeys:[0],
    };

    onCollapse = collapsed => {
        if(collapsed){

        }
        console.log(collapsed);
        this.setState({ collapsed });
    };


    onClickHandler = (props) =>{
        let route = ['/','/cart','/order','/profile','/address','/userManagement','/bookManagerView','/orderManagement','/stats','/managerAnalysis'];
        sessionStorage.setItem("currentTab",JSON.stringify(props.key))
        this.setState({selKeys:[props.key]},()=>{history.push({pathname: route[props.key -1],selKeys: this.state.selKeys})})
    }



    render() {
        const manager = JSON.parse(localStorage.getItem("manager"));

        return (
            <div style={{width:this.state.collapsed? "80px":"180px", maxWidth:this.state.collapsed? "80px":"180px", minWidth:this.state.collapsed? "80px":"180px" }}>
            <div className="mySider">
            <Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
                <Menu selectedKeys={history.location.selKeys || JSON.parse(sessionStorage.getItem("currentTab"))}  mode="inline">
                    <Menu.Item key="1" onClick={this.onClickHandler} >
                        <Icon type="read" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>Books</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={this.onClickHandler}>
                        <Icon type="shopping-cart" style={{ fontSize: '18px'}} />
                        <span style={{ fontSize: '16px'}}>My Cart</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={this.onClickHandler}>
                        <Icon type="solution"  style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>My Orders</span>
                    </Menu.Item>

                    <Menu.Item key="4" onClick={this.onClickHandler}>
                        <Icon type="user" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>My Profile</span>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={this.onClickHandler}>
                        <Icon type="global" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>My Address</span>
                    </Menu.Item>
                    {
                         manager?
                            <Menu.Item key="6" onClick={this.onClickHandler}>
                                <Icon type="setting" style={{ fontSize: '18px'}}/>
                                <span style={{ fontSize: '16px'}}>All Users</span>
                            </Menu.Item>
                            : null
                    }
                    {
                        manager?
                            <Menu.Item key="7" onClick={this.onClickHandler}>
                                <Icon type="database" style={{ fontSize: '18px'}}/>
                                <span style={{ fontSize: '16px'}}>Manage Books</span>
                            </Menu.Item>
                            : null
                    }
                    {
                        manager?
                            <Menu.Item key="8" onClick={this.onClickHandler}>
                                <Icon type="folder" style={{ fontSize: '18px'}}/>
                                <span style={{ fontSize: '16px'}}>Manage Orders</span>
                            </Menu.Item>
                            : null
                    }
                    <Menu.Item key="9" onClick={this.onClickHandler}>
                        <Icon type="cloud" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>History</span>
                    </Menu.Item>
                    {
                        manager?
                            <Menu.Item key="10" onClick={this.onClickHandler}>
                                <Icon type="stock" style={{ fontSize: '18px'}}/>
                                <span style={{ fontSize: '16px'}}>Analytics</span>
                            </Menu.Item>
                            : null
                    }
                </Menu>
            </Sider>
            </div>
            </div>

        );
    }

}