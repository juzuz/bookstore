import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";


import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";

const { Header, Content } = Layout;

class BookView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {books:null};
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});

        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(parseInt(bookId), (data) => {this.setState({bookInfo: data},console.log(data))})
    }

    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <BookDetail info={this.state.bookInfo} />

                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(BookView);