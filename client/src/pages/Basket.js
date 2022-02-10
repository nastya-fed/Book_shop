import React, { useContext, useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import { Context } from "../index";
import axios from "axios";
import { userContext } from "../App";
import BooksItem from "../components/BooksItem";
import { Button, Col, Container } from "react-bootstrap";
import CreateOrder from "../components/modals/CreateOrder";


const Basket = () => {
    const { user } = useContext(Context)
    const { userAuth } = useContext(userContext)
    const [isLoading, setIsLoading] = useState(true);
    const [basketItems, setBasketItems] = useState([]);
    const [bItems, setBItems] = useState([]);
    const arr = []; const arr2 = [];
    const [orderVisible, setOrderVisible] = useState(false)


    const ShowBasketItems = async () => {
//console.log(userAuth.id)
        await axios.get(`http://localhost:5000/api/booksId/r/?userId=${userAuth.id}`)
            .then((response) => {
                setBasketItems(response.data);
                console.log(response.data);

                (response.data).forEach(i => {
                    console.log(i)
                    arr.push(i)
                    arr2.push(i.count)
                })
                console.log(arr);
                setBasketItems(arr);
                setBItems(arr2);

            })
            .catch((e) => { alert(e) })
        await setIsLoading(true);
    }

    const delet = async (booksId, userId) => {
        axios.delete(`http://localhost:5000/api/booksid`,
            { data: { "bookId": booksId, "userId": userId } }
        ).then(() => {
            alert("Товар удален из корзины")
        })
        console.log(booksId, userId)
        await setIsLoading(true);
    }
    const addBook = (booksId, userId, counter) => {
        axios.put(`http://localhost:5000/api/booksid/?userId=${userId}&bookId=${booksId}`,
            { "count": counter + 1 })

    }
    const delBook = (booksId, userId, counter) => {
        axios.put(`http://localhost:5000/api/booksid/?userId=${userId}&bookId=${booksId}`,
            { "count": counter - 1 })
    }

    useEffect(ShowBasketItems, [])
//useEffect(addBook, [])
    let sum = 0;

    return (

        <Container className="mt-3">
            <ul className="list-group">
                <ol >
                    {basketItems.map(i =>
                        <li className="list-group-item ">
                            <BooksItem key={i.id} books={i.book} />
                            <div className="d-flex align-content-between border flex-wrap h-5 mb-3"> </div>
                            <span className="font-weight-bold">Количество</span>:
                            <Button className="ml-5" variant={"outline-dark"}
                                    onClick={() => delBook(i.book.id, userAuth.id, i.count)}>
                                -
                            </Button>
                            <span className="font-italic "><big>{i.count}</big></span>
                            <Button className="ml" variant={"outline-dark"}
                                    onClick={() => addBook(i.book.id, userAuth.id, i.count)}>
                                +
                            </Button>
                            <div className="font-weight-bold" src={sum = sum + Number(i.count) * i.book.price}>Общая цена:<span className="badge-info bg-danger ml-5"><big>{Number(i.count) * i.book.price}</big></span></div>
                            <Col md={25}>
                                <Row className="d-flex flex-column align-items-center">
                                    <Button className="ml" variant={"outline-dark"}
                                            onClick={() => delet(i.book.id, userAuth.id)}>
                                        Удалить
                                    </Button>

                                </Row>
                            </Col>



                        </li>

                    )}
                    <br />
                    <h1 align="center">Итого: {sum}</h1>
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setOrderVisible(true)}
                    >
                        Оформить заказ
                    </Button>

                </ol>

            </ul>
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)} />

        </Container>
    );
}
export default Basket;