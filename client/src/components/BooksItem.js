import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {books_ROUTE} from "../utils/consts";

const BooksItem = ({books,user}) => {
    const history = useHistory()
    return (
        console.log(books.id),
        <Col md={3} className={"mt-3"} onClick={() => history.push(books_ROUTE + '/' + books.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + books.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                </div>
                <div>
                    <b> {books.name}</b>
                </div>
                <div>{books.price+' руб.'}</div>
            </Card>
        </Col>
    );
};

export default BooksItem;
