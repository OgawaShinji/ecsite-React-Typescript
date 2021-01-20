import React from 'react';
import '~/assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from '~/router/routes';
import Header from "~/components/elements/Header"
import Footer from "~/components/elements/Footer"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                {routes}
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
