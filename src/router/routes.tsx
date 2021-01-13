import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import itemList from '../components/itemList';

export const Path = {
    itemList: '/'
};

const routes = (
    <Switch>
        <Route exact path={Path.itemList} component={itemList}/>
        <Redirect to={Path.itemList}/>
    </Switch>
);

export default routes;