import React, {useEffect, useState} from 'react';
import '~/assets/css/App.css';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {selectError, setError} from "~/store/slices/App/error.slice";
import ErrorPage from "~/components/error";
import {makeStyles} from "@material-ui/core";
import {fetchLoginUser, selectLoginUser} from "~/store/slices/App/auth.slice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";
import ScrollToTop from "~/components/elements/ScrollToTop";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";

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

    const [isLogin, setIsLogin] = useState(false)
    // login処理が走ったかを一時的に監視するために用意
    const loginUser = useSelector(selectLoginUser)
    const token = localStorage.getItem('Authorization')

    const errorInStore = useSelector(selectError);

    useEffect(() => {
        if (!loginUser && token) {
            dispatch(fetchLoginUser()).catch((e) => {
                dispatch(setError({isError: true, code: e.message}))
            })
        }
        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [dispatch, loginUser, token])

    // 401error発生時、執行されているがAppに保持され続けているtokenを削除
    useEffect(() => {
        if (errorInStore.code === '401') localStorage.removeItem('Authorization')
    }, [errorInStore])

    // apolloClientの環境設定
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "http://34.84.118.239/django_ql/",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            },
        })
    });

    try {
        return (
            <div className={classes.App}>
                <ApolloProvider client={client}>
                    <ScrollToTop/>
                    <Header isLogin={isLogin}/>
                    {errorInStore.isError ? errorInStore.code === "401" ? <Redirect to="/login"/> :
                        <ErrorPage/> : routes}
                    <Footer/>
                </ApolloProvider>
            </div>
        );
    } catch (e) {
        console.log(e)
        return <ErrorPage/>
    }

};

export default withRouter(App);
