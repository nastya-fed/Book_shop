import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOnebooks} from "../http/booksAPI";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import {Context} from "../index";


const BooksPage = () => {
    const history = useHistory()
    const {user} = useContext(Context)
    const [books, setbooks] = useState({info: []})

    const [typeVisible, setTypeVisible] = useState(false)
    const {id} = useParams()

    /* const [BasketVisible, setBasketVisible] = useState(false)*/
    useEffect(() => {
        fetchOnebooks(id).then(data => setbooks(data))
        console.log('books: ', id)
    }, [])

const qw=(userId, booksId)=>{
        console.log(userId);
        axios.post(`http://localhost:5000/api/booksId`,
            {"basketId": id, "booksId": booksId}
        ).then(()=>{alert("Товар добавлен в корзину")})
}
// const rt=(booksId)=>{
//         console.log(booksId);
//         axios.delete(`http://localhost:5000/api/books/`+booksId).then(()=>{alert("Удалить")})
//     }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + books.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{books.name}</h2>

                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3> {books.price} руб.</h3>
                        <Button
                            variant={"outline-dark"}
                            onClick={()=>{qw(2, books.id)}}

                        >
                            Добавить в корзину
                        </Button>
                        {/*<Button*/}
                        {/*    variant={"outline-dark"}*/}
                        {/*    onClick={()=>{rt( books.id)}}*/}

                        {/*>*/}
                        {/*    Удалить*/}
                        {/*</Button>*/}

                    </Card>
                </Col>
            </Row>


            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {books.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default BooksPage;
