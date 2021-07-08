import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import {history} from "./utils/history";
import BookView from "./view/BookView";
import RegisterView from "./view/RegisterView";
import CartView from "./view/CartView";
import OrderView from "./view/OrderView";
import ProfileView from "./view/ProfileView";
import UserManagementView from "./view/UserManagementView";
import PurchaseConfView from "./view/PurchaseConfView";
import AddressView from "./view/AddressView";
import newAddressView from "./view/newAddressView";
import BookManagerView from "./view/BookManagerView";
import StatisticView from "./view/StatisticView";
import OrderManagementView from './view/OrderManagementView';
import ManagerAnalyticView from './view/ManagerAnalyticView';

class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomeView}  />
                    <LoginRoute exact path="/login" component={LoginView} />
                    <PrivateRoute exact path="/bookDetails" component={BookView} />
                    <Route path = "/register" component={RegisterView}/>
                    <Route path = "/cart" component={CartView}/>
                    <Route path = "/order" component={OrderView}/>
                    <Route path = "/profile" component={ProfileView}/>
                    <Route path = "/address" component ={AddressView}/>
                    <Route path = "/userManagement" component={UserManagementView}/>
                    <Route path = "/purchaseConfirmation" component={PurchaseConfView}/>
                    <Route path = "/newAddressView" component={newAddressView}/>
                    <Route path = "/bookManagerView" component={BookManagerView}/>
                    <Route path = "/orderManagement" component={OrderManagementView}/>
                    <Route path = "/stats" component={StatisticView}/>
                    <Route path = "/managerAnalysis" component={ManagerAnalyticView}/>
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        )
    }


}

export default BasicRoute;