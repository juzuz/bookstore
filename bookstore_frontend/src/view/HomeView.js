import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";

const { Header, Content, Footer } = Layout;

class HomeView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookData: []
        }
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        const callback = (data) => {
            this.setState({bookData:data});
        }
        const {bookData} = this.state;
        return(
            <Layout className="layout">
                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <SearchBar callback ={callback} entity = "Book" include={false}/>
                            <BookCarousel />
                            <BookList grid = {true}  data = {bookData} include ={false}/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(HomeView);