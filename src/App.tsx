import React, {useEffect, useState} from 'react';
import '~/assets/css/App.css';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {makeStyles} from "@material-ui/core";
import ScrollToTop from "~/components/elements/ScrollToTop";
import {useFetchUserQuery} from "~/generated/graphql";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLogin, setIsLogin as _setIsLogin} from "~/store/slices/App/auth.slice";
import {AppDispatch} from "~/store";

const useStyles = makeStyles({
    App: {
        minHeight: "100vh", /* ←コンテンツの高さの最小値＝ブラウザの高さに指定 */
        position: "relative",/* ←相対位置 */
        boxSizing: "border-box",
        paddingBottom: 180
    },
    footer: {
        position: "absolute",
        bottom: 0
    }
});

const App: React.FC<RouteComponentProps> = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch()

    const _isLogin = useSelector(selectIsLogin)
    const [isLogin, setIsLogin] = useState(_isLogin)

    const {data, loading, error} = useFetchUserQuery()

    useEffect(() => {
        if (data?.user) {
            dispatch(_setIsLogin(true))
        } else {
            dispatch(_setIsLogin(false))
        }
    }, [dispatch, data])

    useEffect(() => {
        setIsLogin(_isLogin)
    }, [_isLogin])

    // if(error?.graphQLErrors[0]?.extensions?.code==='UNAUTHORIZED'){
    //     localStorage.removeItem('Authorization')
    // }


    // 401error発生時、執行されているがAppに保持され続けているtokenを削除
    // useEffect(() => {
    //     if (errorInStore.code === '401') localStorage.removeItem('Authorization')
    // }, [errorInStore])


    return (
        <div className={classes.App}>
            <ScrollToTop/>
            <Header isLogin={isLogin}/>
            {routes}
            <Footer/>
        </div>
    );


};

export default withRouter(App);
