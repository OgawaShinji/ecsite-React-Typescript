import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import './assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from './router/routes';
import {AppDispatch} from "./store/index";
import {logout} from "./store/slices/App/auth.slice";

function App() {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('token', 'this is token')
        dispatch(logout())
    }, [dispatch])
    return (
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    );
}

export default App;
