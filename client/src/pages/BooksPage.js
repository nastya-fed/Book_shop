import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOnebooks } from "../http/booksAPI";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { userContext } from "../App";



const BooksPage = () => {
    const history = useHistory()
    const [books, setbooks] = useState({ info: [] })

    const { userAuth } = useContext(userContext)

    const [typeVisible, setTypeVisible] = useState(false)
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchOnebooks(id).then(data => setbooks(data))
        console.log('books: ', id)
    }, [])
    console.log(userAuth.id)


    const [qwr, setqwr] = useState([]);

    const qw = async (book_Id, user_Id) => {
        await axios.get(`http://localhost:5000/api/booksid/one/?userId=${user_Id}&bookId=${book_Id}`)
            .then((response) => {
                setqwr(response.data);
                console.log(response.data);
                if (response.data != null) {
                    axios.put(`http://localhost:5000/api/booksid/?userId=${user_Id}&bookId=${book_Id}`,
                        { "count": response.data.count + 1 })
                }
                else {
                    axios.post(`http://localhost:5000/api/booksId`,
                        { "bookId": book_Id, "userId": user_Id }
                    ).then(() => { alert("Товар добавлен в корзину") })
                }
            })
            .catch((e) => {
                alert(e)
            })
    }

    const del = async (book_Id) => {

        await axios.delete(`http://localhost:5000/api/books/${book_Id}`)
       console.log(book_Id)
        await setIsLoading(true);

    }

    let a = books.id;
    console.log(a);


    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + books.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{books.name}</h2>

                    </Row>
                </Col>


                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3> {books.price} руб.</h3>
                        <Button
                            variant={"outline-dark"}

                            onClick={() => { qw(a, userAuth.id) }}

                        >
                            Добавить в корзину
                        </Button>

                    </Card>
                </Col>
            </Row>


            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {books.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>



           {userAuth.rol === 'ADMIN' ?
            <Row className="d-flex flex-column m-3">
                <Button
                    variant={"outline-dark"}

                    onClick={() => { del(a,userAuth.rol) }}

                >
                   Удалить
                </Button>
            </Row>:
               <h5 className="mr-5">


               </h5>}

        </Container>
    );
};

export default BooksPage;