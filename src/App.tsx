import React from 'react';
import '~/assets/css/App.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header.gql";
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

    // apolloClientの環境設定
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "https://reacthon-pizza.tk/django_ql/",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            },
        })
    });
    return (
        <div className={classes.App}>
            <ApolloProvider client={client}>
                <ScrollToTop/>
                <Header/>
                {routes}
                <Footer/>
            </ApolloProvider>
        </div>
    );

};

export default withRouter(App);
