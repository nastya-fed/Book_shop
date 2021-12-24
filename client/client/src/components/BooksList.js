import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import BooksItem from "./BooksItem";

const BooksList = observer(() => {
    const {books} = useContext(Context)

    return (
        <Row className="d-flex">
            {books.bookss.map(books =>
                <BooksItem key={books.id} books={books}/>
            )}
        </Row>
    );
});

export default BooksList;
