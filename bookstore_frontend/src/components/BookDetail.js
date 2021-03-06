import React from 'react';
import {Descriptions, Button, Select, InputNumber, message} from 'antd';
import {addToCart} from "../services/cartService";
import {EditOutlined} from "@ant-design/icons";
import {history} from "../utils/history";
import WrappedEditForm from "./EditBookForm";

//TODO CREATE FORM FOR EDIT


export class BookDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inputToggle: false,
            quantity:1,
            editMode:false,
            inputNum:1,
        }
    }




    submitOrder = (id,price,name,inventory) =>{
        if(this.state.quantity > inventory){
            message.error("Not enough in stock");
        }
        else{
            let data = {
                userId: JSON.parse(localStorage.getItem("user")).userId,
                bookId: id,
                quantity:parseInt(this.state.quantity),
                price:price,
                title:name
            }

            history.push({
                pathname: '/purchaseConfirmation',
                state: { data: [data] }
            })

        }


    }



    addToCart = (id) => {
        let data = {
            userId: JSON.parse(localStorage.getItem("user")).userId,
            bookId: id,
            quantity:parseInt(this.state.quantity),
            fromCart:false,
        }
        const callback = (data) => {
            if(data.status >= 0) {
                message.success(data.msg);
            }
            else{
                message.error(data.msg);
            }
        };
        addToCart(data,callback);
    }

    quantityHandler = (q,inventory) =>{
        let quantity = parseInt(q);
        if(quantity < 1)
        {
            message.error("Quantity must be greater than 0");
        }
        // Do not accept quantities more than inventory
        else if (quantity > inventory){
            // console.log(this.state.quantity)
            message.error("Not enough in stock");
        }
        // If 10+ quantity, set input box active.
        else if (quantity === 10) {
            this.setState({inputToggle :true})
        }
        else
        {
            this.setState({quantity:quantity});
            this.setState({inputToggle:false});
        }
    }



    render() {
        const {info} = this.props;
        const {Option} = Select;

        if(info == null){
            return null;
        }

        const callback = () => {
            this.setState({editMode:false});
            window.location.reload();
        }

        return (
            <div className={"content"} >

                <div className={"book-detail"} >
                    {
                        JSON.parse(localStorage.getItem("manager")) ?
                            (this.state.editMode ?
                                    null
                                    :
                                    <EditOutlined className="edit-button" style={{fontSize: '20px'}} onClick={() => {this.setState({editMode:true})}}/>
                            )
                            : null
                    }

                    {this.state.editMode?
                        null
                        :
                        <div className={"book-image"}><img alt="image" src={info.image} style={{width:"350px", height:"350px"}}/></div>

                    }
                        {this.state.editMode?
                            <div>
                            <WrappedEditForm data={info} callback ={callback} layout={"vertical"}/>
                                <Button style={{display:'block',width:"100%"}} onClick={()=>this.setState({editMode:false})}>Cancel</Button>
                            </div>

                            :
                            <div className={"descriptions"}>

                                <Descriptions>
                                    <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                                    <Descriptions.Item label={"??????"} span={3}>{info.author}</Descriptions.Item>
                                    <Descriptions.Item label={"??????"} span={3}>{info.type}</Descriptions.Item>
                                    <Descriptions.Item label={"??????"} span={3}>{<span className={"price"}>{'??' + info.price}</span>}</Descriptions.Item>
                                    <Descriptions.Item label={"?????? "} span={3}>{info.inventory !== 0? <span>?????? <span className={"inventory"}>??????{info.inventory}???</span></span> : <span className={"status"}>??????</span>}</Descriptions.Item>
                                    <Descriptions.Item label={"????????????"} span={3}>{info.description}</Descriptions.Item>
                                </Descriptions>
                            </div>

                        }


                </div>


                <div className={"button-groups"}>
                        {!(this.state.inputToggle || this.state.editMode) ?
                            <Select className = "quantity-selector" size ={'large'} style={{ width: 120 }} value={this.state.quantity} onChange={(e) => {this.quantityHandler(e,info.inventory)}}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10+</Option>
                            </Select>:null}
                        {!(!this.state.inputToggle || this.state.editMode) ?  <InputNumber onChange={(e) => {this.setState({inputNum:e});} }/>:null }
                        {!(!this.state.inputToggle || this.state.editMode) ?  <Button className="update" type="primary" onClick ={() => {this.quantityHandler(this.state.inputNum,info.inventory);}}>Update</Button>:null }

                    {! this.state.editMode ?
                        <Button type="danger" icon="shopping-cart" size={"large"}style={{marginLeft:"4%"}} onClick={() => {this.addToCart(info.id)}}>
                        ???????????????
                    </Button> : null}
                    {!this.state.editMode ?
                    <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"4%"}} onClick={()=> {this.submitOrder(info.id,info.price,info.name,info.inventory)}} ghost>
                        ????????????
                    </Button>
                        :null}
                </div>
            </div>


        )

    }

}
