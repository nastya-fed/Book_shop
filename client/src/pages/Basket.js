import React, {useContext, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";

import booksItem from "../components/BooksItem";
import {Context} from "../index";

import axios from "axios";
import {userContext} from "../App";


const Basket = () => {
    const {user} = useContext(Context)
    const {userAuth} = useContext(userContext)
    const [isLoading, setIsLoading]=useState(false);
    const [basketItems, setBasketItems] = useState([])

    const ShowBasketItems = async ()=>{
        console.log(userAuth.id)
        await axios.get(`http://localhost:5000/api/booksId?userId=${userAuth.id}`)
            .then((response)=>{setBasketItems(response.data); console.log((response.data))})
            .catch((e)=>{alert(e)})
        await setIsLoading(true);
    }

    useEffect(ShowBasketItems, [])

    return (

        isLoading
        ?
        <Row className="d-flex">
            {basketItems.map(books =>
                <booksItem key={books.id} books={books.books}/>
            )}

        </Row>
            :
            <div/>
    );
}
export default Basket;


