import React, {useEffect, useState} from 'react';
import { List } from 'antd';
import {getUsers,setLock} from "../services/userService";
import "../css/userManagement.css";
import {deleteUser} from '../services/userService'
import {LockOutlined ,UnlockOutlined,WarningOutlined} from "@ant-design/icons";


const UserManagement = () => {

    const [managers,setManagers] = useState([]);
    const [users,setUsers] = useState([]);
    const [lockStatus,setLockStatus] = useState([]);

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

    return (
        <div>
            <div className="infinite-container-managers">
                <div className="title">Managers</div>


                    <List
                        dataSource={managers}
                        renderItem={item =>(
                            <List.Item className="user-list-item" key ={item.id}>
                                <List.Item.Meta title ={"Username: " + item.username} />
                            </List.Item>
                        )}
                    >

                    </List>
            </div>


            <div className="infinite-container-users">
                <div className="title">Users</div>

                    <List
                        dataSource={users}
                        renderItem={(item,idx) =>(
                            <List.Item className="user-list-item" key ={item.id}>
                                <List.Item.Meta title ={"Username: " + item.username}  />
                                <div>
                                    <WarningOutlined style={{
                                        fontSize: '30px',
                                        marginBottom: '10px',
                                        marginRight: '20px'
                                    }}
                                    onClick={()=>{

                                        deleteUser({id: item.id})
                                    }}
                                    />
                                    <div style={{paddingRight:"10px"}}>
                                        Remove
                                    </div>
                                </div>
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
                                            Unlock
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
                                        Lock
                                        </div>
                                        </div>
                                    }
                                </div>

                            </List.Item>
                        )}
                    >

                    </List>
            </div>
        </div>
    );
};

export default UserManagement;
