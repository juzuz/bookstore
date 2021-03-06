import React from 'react';
import {List} from 'antd'
import {Book} from './Book'
import {getBooks,setRemoved} from "../services/bookService";
import WrappedEditForm from "./EditBookForm";
import {Button} from "antd";


export class BookList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {data:[],edit:[],pages:1};
    }

    retrieveData = (page) => {
        const callback =  (data) => {
            this.setState({data:data.content,pages:data.totalElements});
            this.props.callback({data:data});
        };
        getBooks({page:page}, callback);
    }

    componentDidMount() {
        this.retrieveData(0);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.data.content !== this.state.data ){
            this.setState({data:nextProps.data.content,pages:nextProps.data.totalElements})
        }
        return true;
    }


    handleEditClick = (idx) => {
        let edits = [...this.state.edit]
        let edit = {...edits[idx]}
        edit = true;
        edits[idx] = edit;
        this.setState({edit:edits});
    }

    handleRemove = (id) => {
        let data = {bookId:id}
        const callback = (status) =>{
            if(status)
            {
                window.location.reload();
            }
        }
        setRemoved(data,callback);
    }


    render() {
        const {grid} = this.props;
        const {data,pages,edit} = this.state;
        const callback = () => {
                window.location.reload();
        }
        return (
            <List
                grid={grid?{gutter: 10, column: 4}:0}
                dataSource={data}
                pagination={{
                    onChange: page => {
                        this.retrieveData(page-1)
                    },
                    pageSize: 16,
                    total:pages,
                }}

                renderItem={(item,idx) => (

                    <List.Item  key ={item.id}  >
                        {grid ?
                            <Book info={item}/>
                            :
                            <div >
                                {
                                    edit[idx] ?
                                        <WrappedEditForm data={item} callback = {callback} layout={"inline"}/>
                                        :
                                        <div style = {{display:'flex',justifyContent:'space-between',opacity:item.removed?0.5:1}}>
                                            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                                <Button onClick={() => this.handleEditClick(idx)} disabled={item.removed}>Edit</Button>
                                                <Button onClick={()=> this.handleRemove(item.id)}>
                                                    <div>
                                                        Remove
                                                    </div>
                                                </Button>
                                            </div>
                                            <List.Item.Meta
                                                avatar={<img alt="image" src={item.image} style={{width:"100px",height:"100px",flex:2}}/>}
                                                title = {item.name}
                                                description={
                                                    <div style = {{display:"flex",flexDirection:'row'}}>
                                                        <div style={{width:"300px"}} >
                                                            <div>Author: {item.author}</div>
                                                            <div>Category: {item.type}</div>
                                                            <div>ISBN: {item.isbn}</div>
                                                        </div>
                                                        <div style={{width:"100%"}}>
                                                            <div>Inventory: {item.inventory}</div>
                                                            <div>Price: {item.price}</div>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                }
                            </div>
                        }
                    </List.Item>
                )}
            />
        );
    }

}