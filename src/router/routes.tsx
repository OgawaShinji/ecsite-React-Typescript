import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import itemList from '../components/itemList';
import cart from '../components/cart';
import history from '../components/history';
import itemDetail from '../components/itemDetail';
import login from '../components/login';
import orderComplete from '../components/orderComplete';
import orderConfirm from '../components/orderConfirm';
import register from '../components/register';

export const Path = {
    itemList: '/',
    cart: '/cart',
    history: '/history',
    itemDetail: '/itemDetail/:itemId',
    login: '/login',
    orderComplete: '/orderComplete',
    orderConfirm: '/orderConfirm',
    register: '/register',
};

const routes = (
    <Switch>
        <Route exact path={Path.itemList} component={itemList}/>
        <Route exact path={Path.cart} component={cart}/>
        <Route exact path={Path.history} component={history}/>
        <Route exact path={Path.itemDetail} component={itemDetail}/>
        <Route exact path={Path.login} component={login}/>
        <Route exact path={Path.orderComplete} component={orderComplete}/>
        <Route exact path={Path.orderConfirm} component={orderConfirm}/>
        <Route exact path={Path.register} component={register}/>
        <Redirect to={Path.itemList}/>
    </Switch>
);

export default routes;