import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import BooksList from "../components/BooksList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchbookss, fetchTypes} from "../http/booksAPI";
import Pages from "../components/Pages";
import {userContext} from "../App";

const Shop = observer(() => {
    const {books} = useContext(Context)
    const {userAuth} = useContext(userContext)
    console.log(userAuth)
    useEffect(() => {
        fetchTypes().then(data => books.setTypes(data))
        fetchBrands().then(data => books.setBrands(data))

        fetchbookss(null, null, 1, 2).then(data => {
            books.setbookss(data.rows)
            books.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchbookss(books.selectedType.id, books.selectedBrand.id, books.page, 2).then(data => {
            books.setbookss(data.rows)
            books.setTotalCount(data.count)
        })
    }, [books.page, books.selectedType, books.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <BooksList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
