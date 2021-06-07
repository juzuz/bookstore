import React from 'react';
import { Avatar, Dropdown, Menu} from 'antd';
import '../css/index.css'
import * as userService from '../services/userService'
import config from 'config'
import {history} from "../utils/history";

export class UserAvatar extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {imgUrl:""};
    // }


    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <div onClick={() => {history.push({pathname: '/profile',selKeys: ['4']});}}>Show Profile</div>

                </Menu.Item>
                <Menu.Item>
                    <a href="#" onClick={userService.logout}>
                        Log Out
                    </a>
                </Menu.Item>
            </Menu>
        );

        const {user} = this.props;
        let imgUrl = "";
        try{
            imgUrl =require("../assets/" + user.username + ".jpg");
        }
        catch (err)
        {
            imgUrl = require("../assets/default.png");
        }

        return(
            <div id="avatar">
                <span className="name">Hi, {user.username}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar src={imgUrl} style={{cursor:"pointer"}}/>
                </Dropdown>
            </div>
        );
    }
}