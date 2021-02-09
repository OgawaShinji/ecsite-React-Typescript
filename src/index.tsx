import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux";
import store from './store';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";

// apolloClientの環境設定
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000/",
        headers: {
            Authorization: localStorage.getItem("Authorization")
        },
    })
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
