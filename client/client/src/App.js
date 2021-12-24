import React, {createContext, useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import createAuth0Client from '@auth0/auth0-spa-js';
import auth_config from "./auth_config.json";

export const userContext = createContext(null)

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [userAuth, setUserAuth] = useState({
        id: 0,
        isAuth: false
    });



    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }


    return (
        <userContext.Provider value={{userAuth, setUserAuth}}>
            <BrowserRouter>
                <NavBar />
                <AppRouter />
            </BrowserRouter>
        </userContext.Provider>
    );
});

export default App;
