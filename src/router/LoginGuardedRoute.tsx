import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// 特定のルートで前処理を加えるラッパーコンポーネント
const LoginGuardedRoute = (props: any) => {
    // ここで何らかの前処理を行う
    const token = localStorage.getItem('Authorization')
    if (token && props.path === '/login') {
        return <Redirect to="/"/>
    }

    return <Route {...props} />;
}

export default LoginGuardedRoute;