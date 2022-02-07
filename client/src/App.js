import React, {createContext, useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

export const userContext = createContext(null)

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const newUserAuth= localStorage.getItem('aidi')
    let k=false;
    if (Number(newUserAuth)!==0){ k=true}
    else{console.log(Number(newUserAuth))
       k=false}
    const [userAuth, setUserAuth] = useState({
        id : Number(newUserAuth),
         isAuth: k
    });


    useEffect(() => {
        check().then(data => {
            user.setUser(true)

            if (Number(newUserAuth)!==0){ user.setIsAuth(true)}
            else{console.log(Number(newUserAuth))
                user.setIsAuth(false)}
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
