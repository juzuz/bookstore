import React from 'react';
import {Layout, Button} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";
import WrappedNewBookForm from "../components/NewBookForm";

const { Header, Content, Footer } = Layout;

class BookManagerView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            user:null,
            addToggle:false,
            bookData:[]
        }

        this.toggleHandler = this.toggleHandler.bind(this)
    }


    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user, addToggle:false});
    }

    toggleHandler(){
        this.setState({addToggle:!this.state.addToggle})
    }

    render(){
        const {addToggle} = this.state;

        const callback = () => {
            window.location.reload();
        }

        const dataCallback = (data) => {
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
                            {addToggle ?
                                <div>
                                    <WrappedNewBookForm callback ={callback}/>
                                    <Button
                                        style={{display:'block',width:"100%"}}
                                        onClick={this.toggleHandler}>Cancel</Button>
                                </div>
                                :
                                <div>
                                    <SearchBar callback ={dataCallback} entity = "Book" include ={true}/>
                                    <Button onClick={this.toggleHandler}>Add new Book</Button>

                                    <BookList grid={false} data = {bookData}/>
                                    <div className={"foot-wrapper"}>
                                    </div>
                                </div>
                            }
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(BookManagerView);