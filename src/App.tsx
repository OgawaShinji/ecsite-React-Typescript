import React, {useEffect, useState} from 'react';
import '~/assets/css/App.css';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {selectError} from "~/store/slices/App/error.slice";
import ErrorPage from "~/components/error";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "~/store";
import ScrollToTop from "~/components/elements/ScrollToTop";

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
    const token = localStorage.getItem('Authorization')

    const errorInStore = useSelector(selectError);

    // login状態によってheaderのレイアウトを切り替える処理
    useEffect(() => {
        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [dispatch, token])

    // 401error発生時、執行されているがAppに保持され続けているtokenを削除
    useEffect(() => {
        if (errorInStore.code === '401') localStorage.removeItem('Authorization')
    }, [errorInStore])


    return (
        <div className={classes.App}>
            <ScrollToTop/>
            <Header isLogin={isLogin}/>
            {errorInStore.isError ? errorInStore.code === '401' ? <Redirect to="/login"/> :
                <ErrorPage/> : routes}
            <Footer/>
        </div>
    );
};

export default withRouter(App);
