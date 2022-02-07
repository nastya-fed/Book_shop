import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import {userContext} from "../App"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {userAuth, setUserAuth} = useContext(userContext)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        setUserAuth({id: 0, isAuth: false})
        user.setIsAuth(false)
        localStorage.setItem('aidi', 0)
    }

    return (
        <Navbar bg="danger" variant="danger">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Книжный магазин</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}

                            onClick={() => history.push(BASKET_ROUTE)}

                        >
                            Корзина
                        </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                            className="ml-2"
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
