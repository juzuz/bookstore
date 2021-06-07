import React, {useEffect, useState} from 'react';
import { List, message, Avatar, Spin } from 'antd';
import {getUsers,setLock} from "../services/userService";
import "../css/userManagement.css";
import InfiniteScroll from 'react-infinite-scroller';

import {LockOutlined ,UnlockOutlined } from "@ant-design/icons";


const UserManagement = () => {

    const [managers,setManagers] = useState([]);
    const [users,setUsers] = useState([]);
    const [lockStatus,setLockStatus] = useState([]);
    const [loading,setLoading] = useState(false);
    const [hasMore,setHasMore] = useState(true);


    const retrieveData = (type) => {
        const callback = (values) => {
            if (type === 0)
            {
                setManagers(values);
            }
            else{
                setUsers(values)
                let lock = [];
                values.map(item => {
                    lock.push(item.locked);
                })
                setLockStatus(lock);
            }
            setLoading(false);

        }
        let data = {type:type}
        getUsers(data,callback);
    }

    useEffect(()=>{
        retrieveData(0);
        retrieveData(1);
    },[])

    const handleLock = (lock,id,idx) => {
        let data = {lock:lock, id:id};
        setLock(data);
        setLockStatus(
            state => {
                const list = state.map((item,j) => {
                    if(j === idx){
                        return !item;
                    }
                    else{
                        return item;
                    }
                });
                return list;
            }
        )
    }


    const handleInfiniteOnLoad = () => {
        // this.setState({
        //     loading: true,
        // });
        // if (data.length > 14) {
        //     message.warning('Infinite List loaded all');
        //     this.setState({
        //         hasMore: false,
        //         loading: false,
        //     });
        //     return;
        // }
        // retrieveData();
    };

    return (
        <div>
            <div className="infinite-container-managers">
                <div className="title">Managers</div>

                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => {handleInfiniteOnLoad()}}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={managers}
                        renderItem={item =>(
                            <List.Item className="user-list-item" key ={item.id}>
                                <List.Item.Meta title ={"Username: " + item.username} />
                            </List.Item>
                        )}
                    >
                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>


            <div className="infinite-container-users">
                <div className="title">Users</div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => {handleInfiniteOnLoad()}}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={users}
                        renderItem={(item,idx) =>(
                            <List.Item className="user-list-item" key ={item.userId}>
                                <List.Item.Meta title ={"Username: " + item.username}  />
                                <div className={"lock"}>
                                    {lockStatus[idx] ?
                                        <div className = "lock-container">
                                        <UnlockOutlined className="lock" style={{
                                            fontSize: '30px',
                                            marginBottom: '10px',
                                            marginRight: '10px'
                                        }}
                                        onClick={()=>{handleLock(false,item.id,idx)}}
                                        />
                                        <div style={{alignItems:"center"}}>
                                            Status: Locked
                                        </div>
                                        </div>
                                            :
                                        <div className = "lock-container">
                                        <LockOutlined  className="lock" style={{
                                            fontSize: '30px',
                                            marginBottom: '10px',
                                            marginRight: '10px',
                                            alignContent:'center'
                                        }}
                                           onClick={()=>handleLock(true,item.id,idx)}
                                        />
                                        <div style={{textAlign:"center"}}>
                                        Status: Normal Access
                                        </div>
                                        </div>
                                    }
                                </div>

                            </List.Item>
                        )}
                    >
                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default UserManagement;
