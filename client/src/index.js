import React, {useState, createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import booksStore from "./store/booksStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        books: new booksStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

