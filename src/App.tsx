import React from 'react';
import '~/assets/css/App.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"
import {makeStyles} from "@material-ui/core";
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
    // const dispatch: AppDispatch = useDispatch()
    //
    // const _isLogin = useSelector(selectIsLogin)
    // const [isLogin, setIsLogin] = useState(_isLogin)
    //
    // const {data, loading, error} = useFetchUserQuery()
    //
    //
    // useEffect(() => {
    //     if (data?.user) {
    //         console.log('true')
    //         dispatch(_setIsLogin(true))
    //     } else {
    //         console.log('false')
    //         dispatch(_setIsLogin(false))
    //     }
    // }, [dispatch, data])
    //
    // useEffect(() => {
    //     setIsLogin(_isLogin)
    // }, [_isLogin])

    // if(error?.graphQLErrors[0]?.extensions?.code==='UNAUTHORIZED'){
    //     localStorage.removeItem('Authorization')
    // }


    // 401error発生時、執行されているがAppに保持され続けているtokenを削除
    // useEffect(() => {
    //     if (errorInStore.code === '401') localStorage.removeItem('Authorization')
    // }, [errorInStore])

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


    return (
        <ApolloProvider client={client}>
            <div className={classes.App}>
                <ScrollToTop/>
                <Header isLogin={true}/>
                {routes}
                <Footer/>
            </div>
        </ApolloProvider>
    );


};

export default withRouter(App);
