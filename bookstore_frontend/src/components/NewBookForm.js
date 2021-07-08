import React from 'react';
import { Form, Input, Button  } from 'antd';
import 'antd/dist/antd.css';
import '../css/address.css'
import {addBook} from "../services/bookService";


class NewBookForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        const formData = this.props.form
        const callback = this.props.callback;
        formData.validateFields((err, values) => {
            if (!err) {
                let book = {
                    name: formData.getFieldValue("name"),
                    author: formData.getFieldValue("author"),
                    type: formData.getFieldValue('type'),
                    price:  parseFloat(formData.getFieldValue("price")),
                    inventory: parseInt(formData.getFieldValue("inventory")),
                    isbn: formData.getFieldValue("isbn"),
                    description: formData.getFieldValue('description'),
                    image: formData.getFieldValue("image")
                }
                addBook(book,callback);
            }
        });
    };

    posNum = (rule,value,callback) => {
        if(value >= 0){
            callback()
        }
        else{
            callback("Number can't be negative!")
        }
    }

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {TextArea} = Input;
        return (

            <Form onSubmit={this.handleSubmit} style ={{display:"flex",flexDirection:"column"}}>

                <Form.Item
                label={"Title"}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Book title cannot be empty!' }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item
                label ="Author">
                    {getFieldDecorator('author', {
                        rules: [{ required: true, message: "Please enter the author's name!" }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item
                label={"Category"}>
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: "Please enter the book category!" }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item
                label={"Price"}>
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: "Price cannot be empty!" },{validator:this.posNum}],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item
                label={"Inventory"}>
                    {getFieldDecorator('inventory', {
                        rules: [{ required: true, message: "Inventory must be greater or equal to 0!" },{validator:this.posNum}],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item
                label={"ISBN"}>
                    {getFieldDecorator('isbn', {
                        rules: [{ required: true, message: "ISBN cannot be empty!" }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>
                <Form.Item

                label={"Description"}>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: "Description must not be empty!" }],
                    })(
                        <TextArea rows={3}/>,
                    )}
                </Form.Item>
                <Form.Item
                    label={"Image URL"}>
                    {getFieldDecorator('image', {
                        rules: [{ required: true, message: "Add an image url!" }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                    style={{marginTop:"40px"}}
                    >
                        Save
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

const WrappedNewBookForm = Form.create({ name: "edit-form" })(NewBookForm);

export default WrappedNewBookForm
