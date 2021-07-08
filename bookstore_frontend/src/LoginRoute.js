import React from 'react';
import {Route} from 'react-router-dom'
import * as userService from "./services/userService"
import Cookies from "js-cookie";

export class LoginRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    checkAuth = (data) => {
        if (data.status >= 0) {
            this.setState({isAuthed: true, hasAuthed: true});
        } else {
            localStorage.removeItem('user');
            this.setState({isAuthed: false, hasAuthed: true});
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuth);
        let cookie = Cookies.get("remember");
        userService.cookieLogin({cookie:cookie})
    }


    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;


        if (!this.state.hasAuthed) {
            return null;
        }

        console.log("LOG PROC",this.props.location.proceed)
        return <Route path={path} exact={exact} strict={strict} render={props => (
            // this.state.isAuthed ? (
            //     <Redirect to={{
            //         pathname: '/',
            //         state: {from: props.location}
            //     }}/>
            // ) : (
                <Component {...props}/>
            // )
        )}/>
    }
}

export default LoginRoute