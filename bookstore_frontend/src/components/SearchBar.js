import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import {getBooks} from "../services/bookService";
import {getOrders} from "../services/orderService";
import {history} from "../utils/history";

const { Option } = AutoComplete;

function onSelect(value) {
    history.push('/bookDetails?id=' + value);
}



function renderBookOption(item) {
    return (
        <Option key={item.id} text={item.category}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                      Found {item.name} in {item.type}
                </span>
            </div>
        </Option>
    );
}

function renderOrderOption(item) {
    return (
        <Option key={item.orderId} text={item.purchaseDate}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                      Found order for {item.receiver} on {item.purchaseDate}
                </span>
            </div>
        </Option>
    );
}

export class SearchBar extends React.Component {
    state = {
        data: [],
        dataSource: [],
    };

    searchResult(query,entity) {
        let arr =[];
        if(entity === "Book"){
            this.state.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => {
                arr.push(item);
            });
        }
        else{
            this.state.data.filter(order=>order.books.some(book=>book.title.toLowerCase().includes(query.toLowerCase()))).map((item) => {
                arr.push(item);
            });
        }
        return arr;

    }

    handleSearch = value => {
        const {entity} = this.props;
        const searchResults = this.searchResult(value,entity);
        this.setState({
            dataSource: value ?  searchResults: [],
        });
        this.props.callback(value?  searchResults: this.state.data)
    };

    componentDidMount() {

        const {entity,include,manager} = this.props;

        const callback =  (data) => {
            this.setState({data:data});
            this.props.callback(data)
        };
        if(entity === "Book") {
            getBooks({"include": include}, callback);
        }
        else{
            if(manager)
                getOrders({id: 0},callback)
            else{
                const {userId} = JSON.parse(localStorage.getItem("user"));
                getOrders({id:userId},callback)
            }
        }
    }



    render() {
        const { dataSource } = this.state;
        const {entity} = this.props;

        const renderOpt = entity === "Book"? renderBookOption: renderOrderOption;
        const selectOpt = entity === "Book"? onSelect:null;

        return (
            <div className="global-search-wrapper" style={{ width: 300 }}>
                <AutoComplete
                    className="global-search"
                    size="large"
                    style={{ width: '100%' }}
                    dataSource={dataSource.map(renderOpt)}
                    onSelect={selectOpt}
                    onSearch={this.handleSearch}
                    placeholder={"Search for " + entity}
                    optionLabelProp="text"
                >
                    <Input
                        suffix={
                            <Button
                                className="search-btn"
                                style={{ marginRight: -12 }}
                                size="large"
                                type="primary"
                            >
                                <Icon type="search" />
                            </Button>
                        }
                    />
                </AutoComplete>
            </div>
        );
    }
}