import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import '../css/address.css'
import * as userService from '../services/userService'
import {history} from "../utils/history";


class AddressForm extends React.Component {


    receiptHandler = use => {
        console.log(use)
    }

    handleSubmit = (e,use) => {
        e.preventDefault();
        const formData = this.props.form
        const {type} =this.props;
        const {callback} = this.props;

        formData.validateFields((err, values) => {
            if (!err) {
                let data = {
                    userId: JSON.parse(localStorage.getItem('user')).userId,
                    name: formData.getFieldValue("name"),
                    phone: formData.getFieldValue("phone"),
                    address: formData.getFieldValue('address')
                }
                if(type == "console") {
                    const callbackConsole = (status) => {
                        if (status)
                            history.push("/address")
                    }
                    userService.addAdd(data, callbackConsole);
                }
                else{

                    if(use === 0){
                        userService.addAdd(data, callback);
                    }
                    else{
                        callback(data);
                    }
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {type} =this.props;

        return (
            <Form  className="address-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please enter a name!' }],
                    })(
                        <Input
                            placeholder="Receiver Name"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: "Please enter the receiver's phone number!" }],
                    })(
                        <Input
                            placeholder="Receiver phone number"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: "Please enter the shipping address!" }],
                    })(
                        <Input
                            placeholder="Shipping address"
                        />,
                    )}
                </Form.Item>

                {type == "console" ?
                    <Form.Item>
                        <Button type="primary" className="login-form-button"
                                onClick={this.handleSubmit}>
                            Add address
                        </Button>
                    </Form.Item>:
                    <div>
                        <Form.Item>
                            <Button type="primary"  className="login-form-button"
                                    onClick={e=>this.handleSubmit(e,0)}
                            >
                                Save address and use
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"  className="login-form-button"
                                    onClick={e=>this.handleSubmit(e,1)}
                                    >
                                Use as one-time address
                            </Button>
                        </Form.Item>
                    </div>
                }
            </Form>
        );
    }
}

const WrappedAddressForm = Form.create({ name: 'address_form' })(AddressForm);

export default WrappedAddressForm
