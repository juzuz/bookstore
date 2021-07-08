import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBarEdit";
import {BookList} from "../components/BookListEdit";

const { Header, Content } = Layout;

class HomeView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookData: []
        }
    }



    render(){

        const callback = (data) => {
            if(data.data !== undefined)
                this.setState({bookData:data.data});
        }
        const {bookData} = this.state;


        // Each Component, Search and BookList gets the first page of the books.
        // The search bar only autocompletes books on the page.
        // When the search button is clicked, Books that contain the query is returned in pageable objects.
        // Then the callback in searchbar sets the homeview data to the new pageable data.
        // This data is sent down as a prop for booklist and displayed.
        // When a new page is chosen. The page is retrieved and by the call back, the home view state is changed.
        // This changed value will pass down to the search bar, thus allowing search within the same page.
        return(
            <Layout className="layout">
                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <SearchBar entity = "Book" data = {bookData} callback={callback}/>
                            <BookCarousel />
                            <BookList grid = {true}  data = {bookData} callback = {callback} />
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