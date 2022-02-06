import {Row} from "react-bootstrap";
import BooksItem from "./BooksItem";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchbookss, fetchTypes} from "../http/booksAPI";

const BasketList = observer(() => {
    const {books} = useContext(Context)
    useEffect(() => {

        fetchbookss().then(data => {
            books.setbookss(data.rows)
            books.setTotalCount(data.count)
        })
    }, [])
    return (
        <Row className="d-flex">
            {books.bookss.map(books =>
                <BooksItem key={books.id} books={books}/>
            )}
        </Row>
    );
});

export default BasketList;
