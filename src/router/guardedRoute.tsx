import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {ErrorBoundary} from "react-error-boundary";
import ErrorPage from "~/components/error";

// 特定のルートで前処理を加えるラッパーコンポーネント
const GuardedRoute = (props: RouteProps) => {
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

    return (<ErrorBoundary FallbackComponent={ErrorPage}><Route {...props}/></ErrorBoundary>)
}

export default GuardedRoute;