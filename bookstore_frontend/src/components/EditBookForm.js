import React from 'react';
import { Form, Input, Button  } from 'antd';
import 'antd/dist/antd.css';
import '../css/address.css'
import {updateBook} from "../services/bookService";


class EditForm extends React.Component {




    handleSubmit = e => {
        e.preventDefault();
        const formData = this.props.form
        const callback = this.props.callback;
        formData.validateFields((err, values) => {
            if (!err) {
                let data = {
                    id:  formData.getFieldValue("bookId"),
                    title: formData.getFieldValue("name"),
                    author: formData.getFieldValue("author"),
                    type: formData.getFieldValue('type'),
                    price:  formData.getFieldValue("price"),
                    inventory: formData.getFieldValue("inventory"),
                    isbn: formData.getFieldValue("isbn"),
                    description: formData.getFieldValue('description')
                }
                updateBook(data,callback);

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
        const defaults = this.props.data;
        this.props.form.setFieldsValue({
            bookId: defaults.id,
            name: defaults.name,
            author: defaults.author,
            type: defaults.type,
            price:defaults.price,
            inventory:defaults.inventory,
            isbn:defaults.isbn,
            description:defaults.description
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {TextArea} = Input;
        const {layout} = this.props;
        const defaults = this.props.data;
        return (

            <Form onSubmit={this.handleSubmit}
            layout={layout} style={{display:layout ==="inline"?"flex":""}}>
                {layout === "inline"?
                    <div>
                        <img alt="image" src={defaults.image} style={{width:"100px",height:"100px"}}/>
                    </div>:
                    null
                }
                {<Form.Item style={{display:"none"}}>
                    {getFieldDecorator("bookId", {
                        rules: [{ required: true, message: 'Book title cannot be empty!' }],
                    })(
                        <Input/>,
                    )}
                </Form.Item>}
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
                    style={{display:layout==="inline"?"none":""}}
                label={"Description"}>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: "Description must not be empty!" }],
                    })(
                        <TextArea rows={3}/>,
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

const WrappedEditForm = Form.create({ name: "edit-form" })(EditForm);

export default WrappedEditForm
