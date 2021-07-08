import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }





    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;


        let proceed = this.props.location.state === undefined?false:true;
        return <Route path={path} exact={exact} strict={strict} render={props => (
             proceed ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location},
                    proceed: proceed
                }}/>
            )
        )}/>
    }
}

