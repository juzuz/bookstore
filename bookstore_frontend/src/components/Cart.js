import React, {useEffect, useState} from 'react';
import {Card, Button, Checkbox, Select, InputNumber, message} from 'antd';
import '../css/cart.css';
import {getCart, updateQuantity,deleteItem} from "../services/cartService";
import {Link} from "react-router-dom";
import {history} from "../utils/history";

const Cart = () => {
    // Stores all the books
    const [cartItems,setCartItems] = useState([]);
    // Checkbox array
    const [checked,setChecked] = useState([]);
    // Total sum of checked books
    const [sum,setSum] = useState(0);
    // Toggle for whether to display input box over selector box
    const [inputToggle,setInputToggle] = useState(false);
    // Used to set toggle for the desired book in the Cart
    const [inputIndex,setInputIndex] = useState(-1);
    // Stores the input in the input box
    const [inputNum,setInputNum] = useState(0);
    // We need some delay to rerender the cartItem update. Therefore this toggle delays the load for a second
    const [loading,setLoading] = useState(false);

    const {Option} = Select;


    //Calculate the sum of the books that are checked
    // eslint-disable-next-line no-undef,react-hooks/exhaustive-deps
    const calcSum = (data)=>
    {

        let i,total = 0;
        // One the cart item information is stored, the state is yet updated
        // Thus the checked array is yet updated either. setState() does not update immediately
        // therefore in this case, if the date(cartItems) is not empty, assume all checks are selected.
        if(checked.length === 0 && data.length!==0){
            for (i = 0; i < data.length; i++) {
                total += data[i].book.price * data[i].amount;
            }
        }
        if(checked.length!==0 && data.length!==0)
        {
            for (i = 0; i < data.length; i++) {
                if(checked[i] === true)
                    total += data[i].book.price * data[i].amount;
            }
        }
        setSum(total.toFixed(2));
    }

    //Retrieves data from database
    // the parameter is used maintain the previous checkbox state.
    // After updating the database the page refreshes and recreates all the checkboxes.
    // Taking in the previous checkbox state allows us to maintain the checkbox and only
    // change the quantity
    // eslint-disable-next-line no-undef,react-hooks/exhaustive-deps
    const retrieveData = (check = null) => {
        const callback =  (data) => {
            // Initialize checkbox array, unless specified.
            if (check === null)
                setChecked(new Array(data.length).fill(true))
            else
                setChecked(check);
            setCartItems(data);
            calcSum(data);
            setInputToggle(false)
        }

        let id =JSON.parse(localStorage.getItem("user")).userId;
        getCart(id, callback);
    }


    //When the quantity is selected update in database
    const quantityHandler= (e,id,inventory,prev_check,index)=> {
        let quantity = parseInt(e);
        const callback = (data) => {
            if (data === true) {
                setLoading(true);
                retrieveData(prev_check);
            }
        };
        //Delete Item
        if (quantity === 0){
            let data = {
                userId: JSON.parse(localStorage.getItem("user")).userId,
                bookId: id,
            }
            deleteItem(data,callback)
        }
        // Don't except negative values
        else if(quantity < 1)
        {
            message.error("Quantity must be greater than 0");
        }
        // Do not accept quantities more than inventory
        else if (quantity > inventory){
            message.error("Not enough in stock");
        }
        // If 10+ quantity, set input box active.
        else if (quantity === 10) {
            setInputToggle(true);
            setInputIndex(index);
        }
        // Any other value is acceptable
        else {
            let data = {
                        userId: JSON.parse(localStorage.getItem("user")).userId,
                        bookId: id,
                        quantity: quantity
                    }
            updateQuantity(data, callback);
            setInputIndex(-1);
        }
    }

    const inputHandler = e =>{
        setInputNum(e);
    }

    // state variables modified directly do not function properly.
    const handleAll =()=> {
        if (checked.every((selected => selected ===true))){
            setChecked(
                state => {
                    const list = state.map(item => false)
                    return list;
                }
            )
        }
        else{
            setChecked(
                state => {
                    const list = state.map(item => true)
                    return list;
                }
            )
        }

    }

    const handleSelect=(id)=>{
        setChecked(
            state => {
                const list = state.map((item,j) => {
                    if(j === id){
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

    const submitOrder = () => {
        let i;
        let data = [];
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        for (i = 0; i < cartItems.length;i++){
            if(checked[i])
            {
                let bookInfo = cartItems[i];
                console.log(bookInfo)
                data.push({
                    userId:userId,
                    bookId:bookInfo.book.id,
                    quantity: bookInfo.amount,
                    price: bookInfo.book.price,
                    title: bookInfo.book.name,
                    fromCart: true,
                });
            }
        }

        history.push({
            pathname: '/purchaseConfirmation',
            state: { data: data }
        })
    }

    //On page render, retrieve data
    useEffect(() => {
        setLoading(true);
        retrieveData()
    },[]);

    //Whenever the checkbox state changes, rerun calcSum
    useEffect(() => {
        calcSum(cartItems)
    },[ cartItems, checked]);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    },[cartItems]);




    return (
        <div className="cart-container">
            <div className="cart-box">
                <Card>
                    {
                        cartItems.length!==0?
                        <div className="cart-title">Shopping Cart</div>:
                            <div className="cart-title">Your Cart is Empty</div>

                    }
                    <Button className="card-deselect"
                            type="link"
                            onClick={() => {handleAll()} }
                    >
                        {
                            checked.length!==0?
                                checked.every((selected => selected ===true)) ? "Deselect all items":"Select all Items":null}
                    </Button>
                    {cartItems.length > 0 ?
                        cartItems.map((val,index) =>
                            <Card  className="ant-content-card" loading={loading} >
                                <div className="card-content">
                                    <Checkbox checked={checked[index]} onChange={() => {handleSelect(index)}} className="book-selector"/>

                                    <div className ="bookInCart-Container">
                                        <Link to={{
                                            pathname: '/bookDetails',
                                            search: '?id=' + val.book.id
                                        }}
                                              target="_blank"
                                        >
                                            <div className="book-image">
                                                {<img alt="image" src={val.book.image} className={"bookImg"}/>}
                                            </div>
                                        </Link>
                                        <div className="information-list">
                                            <Link to={{
                                                pathname: '/bookDetails',
                                                search: '?id=' + val.book.id
                                            }}
                                                  target="_blank"
                                            >
                                                <div className="description">
                                                    <p>{val.book.name}</p>
                                                </div>
                                            </Link>
                                            <ul className="info">
                                                <li>作者： {val["book"].author}</li>
                                                <li className="stock-style">{val.book.inventory > 0 ? <p>有库存</p>: <p>断货</p>}</li>
                                                {inputToggle? null :
                                                <Select className = "quantity-selector"
                                                        style={{ width: 120 }}
                                                        defaultValue={val.amount}
                                                        onChange={(e) =>
                                                            {quantityHandler(e,val.book.id,val.book.inventory,checked,index)}}
                                                >
                                                    <Option value="0">0 (Delete)</Option>
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
                                                </Select>}
                                                {(index === inputIndex) && inputToggle ? <InputNumber onChange={inputHandler}/> : null}
                                                {(index === inputIndex) && inputToggle?
                                                    <Button className="update"
                                                            type="primary"
                                                            onClick={() => {
                                                                quantityHandler(inputNum.toString(),
                                                                                val["book"].id,val["book"].inventory,checked,index)}}
                                                    >Update
                                                    </Button> : null}
                                                <Button className="delete-button" type="link" onClick={() => {quantityHandler("0",val["book"].id)} }>Delete</Button>
                                            </ul>
                                        </div>

                                        <div className="priceInCart"  >
                                            <p>{'¥' + val["book"].price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                        :
                        <div className="cart-empty-text">
                            Your Shopping Cart lives to serve. Give it a purpose -- fill it with good books, gifts for friends and family, and more!
                            <br/> Continue shopping on our
                            <Link className="ab" to={{
                                pathname: '/',}}
                            > bookstore homepage </Link>
                            and explore from our quality books!
                            <br/>Who knows? Your next bet may create an unforgettable adventure~
                        </div>
                    }
                    {
                    cartItems.length !== 0 ?
                        <div className="divider-container">
                            <div className="sum" hidden={loading}>
                                {"总额：¥" + sum}
                            </div>
                            <Button className = "purchase-button" type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"4%"}} onClick={()=> {submitOrder()}} ghost>
                                立即购买
                            </Button>
                        </div>
                        : null


                    }

                </Card>
            </div>
        </div>
    );
};

export default Cart;
