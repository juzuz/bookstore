import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import {getBooks} from "../services/bookService";
import {getOrdersByQueryAndDateAndUserAndPage} from "../services/orderService";
import {history} from "../utils/history";

const { Option } = AutoComplete;

function onSelect(value) {
    console.log("SELECT",value)
    history.push('/bookDetails?id=' + value,{auth:true});
}



function renderBookOption(item) {
    return (
        <Option key={item.id} text={item.category}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                      Found {item.name} in {item.type} by {item.author}
                </span>
            </div>
        </Option>
    );
}

function renderOrderOption(item) {
    return (
        <Option key={item.orderId} text={item.orderDate}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                      Found order for {item.buyer} on {item.orderDate}
                </span>
            </div>
        </Option>
    );
}

export class SearchBar extends React.Component {
    state = {
        data: [],
        dataSource: [],
        query:"",
    };


    searchResult(query,entity) {

        let arr =[];
        if(entity === "Book"){
            this.state.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => {
                arr.push(item);
            });
        }
        else{
            this.state.data.filter(order=>order.orderItems.some(book=>book.book.name.toLowerCase().includes(query.toLowerCase()))).map((item) => {
                arr.push(item);
            });
        }
        return arr;

    }

    handleSearch = value => {
        const {entity} = this.props;

        //Callbacks and setters
        this.setState({query:value})
        this.props.callback({query: value})

        // Search by entity in the data state
        const searchResults = this.searchResult(value,entity);
        this.setState({
            dataSource: value ?  searchResults: [],
        });
    };

    handleSearchClick = () => {
        const {query} = this.state;
        if(this.props.entity === "Book"){
            const callback =(data) => {
                this.props.callback({data:data})
            }
            getBooks({query:query},callback);
        }
        else{
            const callback = data => {
                this.props.callback({data:data})
            }
            const {userId} = JSON.parse(localStorage.getItem("user"));
            let id = this.props.manager?0:userId;
            getOrdersByQueryAndDateAndUserAndPage( {id:id,query: this.state.query,filterDates: this.props.filterDates},callback)
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Catches updates from home view and sets the data state.
        if(nextProps.data.content !== this.state.data){
            this.setState({data:nextProps.data.content})
        }
        return true;
    }

    componentDidMount() {
        const {entity,manager} = this.props;

        const callback =  (data) => {
            this.setState({data:data.content});
        };
        if(entity === "Book") {
            getBooks({}, callback);
        }
        else{
            if(manager)
                getOrdersByQueryAndDateAndUserAndPage( {id:0,query: this.state.query,filterDates: this.props.filterDates},callback)
            else{
                const {userId} = JSON.parse(localStorage.getItem("user"));
                let id = this.props.manager?0:userId;
                getOrdersByQueryAndDateAndUserAndPage( {id:id,query: this.state.query,filterDates: this.props.filterDates},callback)
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
                                onClick={this.handleSearchClick}
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