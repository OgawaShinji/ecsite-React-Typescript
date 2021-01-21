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

const App: React.FC = () => {
    const errorInStore = useSelector(selectError);
    useEffect(() => {
    }, [errorInStore])
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                {errorInStore.isError ?
                    <ErrorPage errorCode={errorInStore.code ? errorInStore.code : 500}/> : routes}
                <Footer/>
            </BrowserRouter>
        </div>
    );
};
export default App;
