import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// 特定のルートで前処理を加えるラッパーコンポーネント
const GuardedRoute = (props: any) => {
    // ここで何らかの前処理を行う
    const token = localStorage.getItem('Authorization')

    if (!token) {
        if (props.path !== '/login') {
            // login中に見せてもいいページを任意に条件式へ
            if (props.path !== '/register') {
                return <Redirect to="/login"/>
            }
        }
    }

    return <Route {...props} />;
}

export default GuardedRoute;