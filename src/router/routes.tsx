import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import itemList from '../components/itemList';
import App from "../App";

export const Path = {
    app: '/',
    itemList: '/itemList'
};

const routes = (
    <Switch>
        <Route exact path={Path.app} component={App}/>
        <Route exact path={Path.itemList} component={itemList}/>
        <Redirect to={Path.app}/>
    </Switch>
);

export default routes;