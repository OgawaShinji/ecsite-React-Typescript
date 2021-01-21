import React, {useEffect, useState} from 'react';
import '~/assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {AppDispatch} from "~/store";
import {useDispatch, useSelector} from "react-redux";
import {selectError, setError} from "~/store/slices/App/error.slice";
import ErrorPage from "~/components/error";
import {makeStyles} from "@material-ui/core";
import {fetchLoginUser, selectLoginUser} from "~/store/slices/App/auth.slice";
import {useDispatch, useSelector} from "react-redux";

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

function App() {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(false)
    // login処理が走ったかを一時的に監視するために用意
    const loginUser = useSelector(selectLoginUser)
    const token = localStorage.getItem('Authorization')

    const errorInStore = useSelector(selectError);
    useEffect(() => {
    }, [errorInStore])
  
    useEffect(() => {
        if (!loginUser && token) {
            dispatch(fetchLoginUser())
        }
        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [loginUser])

    return (
        <div className={classes.App}>
            <BrowserRouter>
                <Header isLogin={isLogin}/>
                {errorInStore.isError ?
                    <ErrorPage errorCode={errorInStore.code ? errorInStore.code : 500}/> : routes}
                <Footer/>
            </BrowserRouter>
        </div>
    );
};
export default App;
