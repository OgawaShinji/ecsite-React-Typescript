import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import store from "~/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

test('renders learn react link', () => {
    /*render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>);*/
    //const linkElement = screen.getByText(/learn react/i);
    //expect(linkElement).toBeInTheDocument();
});
