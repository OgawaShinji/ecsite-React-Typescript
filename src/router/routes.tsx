import React from "react";
import {Redirect, Switch} from 'react-router-dom';
import GuardedRoute from "~/router/guardedRoute";
import LoginGuardedRoute from "~/router/LoginGuardedRoute";

import ItemListGQL from "~/components/itemList/index.gql";
import cart from '../components/cart';
import HistoryGQL from "~/components/history/index.gql";
import ItemDetailGQL from "~/components/itemDetail/index.gql";
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
        <GuardedRoute exact path={Path.itemList} component={ItemListGQL}/>
        <GuardedRoute exact path={Path.cart} component={cart}/>
        <GuardedRoute exact path={Path.history} component={HistoryGQL}/>
        <GuardedRoute exact path={Path.itemDetail} component={ItemDetailGQL}/>
        <LoginGuardedRoute exact path={Path.login} component={login}/>
        <GuardedRoute exact path={Path.orderComplete} component={orderComplete}/>
        <GuardedRoute exact path={Path.orderConfirm} component={orderConfirm}/>
        <GuardedRoute exact path={Path.register} component={register}/>
        <Redirect to={Path.itemList}/>
    </Switch>
);

export default routes;