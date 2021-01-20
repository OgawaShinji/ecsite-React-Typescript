import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import '~/assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from '~/router/routes';
import {AppDispatch} from "~/store";
import {fetchLoginUser, login, logout} from "~/store/slices/App/auth.slice";

function App() {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        const a = async () => {
            await dispatch(login({email: "email", password: "pass"})).then(() => dispatch(fetchLoginUser()))
            //下記のように検証したいメソッドを追加していって下さい
            //await dispatch()
            // await dispatch(logout())
        }
        a()
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
