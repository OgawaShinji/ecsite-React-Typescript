import React from "react";
import {Redirect, Switch} from 'react-router-dom';
import GuardedRoute from "~/router/guardedRoute";

import itemList from '../components/itemList';
import cart from '../components/cart/index';
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
        <GuardedRoute exact path={Path.itemList} component={itemList}/>
        <GuardedRoute exact path={Path.cart} component={cart}/>
        <GuardedRoute exact path={Path.history} component={history}/>
        <GuardedRoute exact path={Path.itemDetail} component={itemDetail}/>
        <GuardedRoute exact path={Path.login} component={login}/>
        <GuardedRoute exact path={Path.orderComplete} component={orderComplete}/>
        <GuardedRoute exact path={Path.orderConfirm} component={orderConfirm}/>
        <GuardedRoute exact path={Path.register} component={register}/>
        <Redirect to={Path.itemList}/>
    </Switch>
);

export default routes;