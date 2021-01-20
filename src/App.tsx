import React from 'react';
import '~/assets/css/App.css';
import {BrowserRouter} from "react-router-dom";
import routes from '~/router/routes';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    );
}

export default App;
