import React, {useEffect, useState} from 'react';
import '~/assets/css/App.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {makeStyles} from "@material-ui/core";
import ScrollToTop from "~/components/elements/ScrollToTop";
import {useFetchUserQuery} from "~/generated/graphql";

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
    // const dispatch: AppDispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(false)
    // login処理が走ったかを一時的に監視するために用意
    // const loginUser = useSelector(selectLoginUser)
    // const token = localStorage.getItem('Authorization')

    // useEffect(() => {
    //     if (!loginUser && token) {
    //         dispatch(fetchLoginUser()).catch((e) => {
    //             dispatch(setError({isError: true, code: e.message}))
    //         })
    //     }
    //     if (token) {
    //         setIsLogin(true)
    //     } else {
    //         setIsLogin(false)
    //     }
    // }, [dispatch, loginUser, token])

    const {data, error} = useFetchUserQuery()
    console.log(data?.user)

    // useEffect(() => {
        console.log(data?.user)
        if (data?.user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    // },[data])


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
