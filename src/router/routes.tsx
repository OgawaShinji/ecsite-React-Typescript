import React from "react";
import {Redirect, Switch} from 'react-router-dom';
import GuardedRoute from "~/router/guardedRoute";
import LoginGuardedRoute from "~/router/LoginGuardedRoute";

import ItemList from "~/components/itemList";
import Cart from "~/components/cart";
import History from "~/components/history";
import ItemDetail from "~/components/itemDetail";
import Login from "~/components/login";
import OrderComplete from "~/components/orderComplete";
import OrderConfirm from "~/components/orderConfirm";
import Register from "~/components/register";

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
        <GuardedRoute exact path={Path.itemList} component={ItemList}/>
        <GuardedRoute exact path={Path.cart} component={Cart}/>
        <GuardedRoute exact path={Path.history} component={History}/>
        <GuardedRoute exact path={Path.itemDetail} component={ItemDetail}/>
        <LoginGuardedRoute exact path={Path.login} component={Login}/>
        <GuardedRoute exact path={Path.orderComplete} component={OrderComplete}/>
        <GuardedRoute exact path={Path.orderConfirm} component={OrderConfirm}/>
        <GuardedRoute exact path={Path.register} component={Register}/>
        <Redirect to={Path.itemList}/>
    </Switch>
);

export default routes;