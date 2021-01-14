import React, {useEffect} from 'react';
import './assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from './router/routes';
import {AppDispatch} from "./store";
import {useDispatch} from "react-redux";
import {logout} from "./store/actions/user.action";

function App() {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('token', 'this is token')
        dispatch(logout())
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    );
}

export default App;
