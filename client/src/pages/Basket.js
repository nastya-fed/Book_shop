import React, {useContext, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import booksItem from "../components/BooksItem";
import {Context} from "../index";
import axios from "axios";
import {userContext} from "../App";
import {check} from "../http/userAPI";
import BooksItem from "../components/BooksItem";


const Basket = () => {
    const {user} = useContext(Context)
    const {userAuth} = useContext(userContext)
    const [isLoading, setIsLoading]=useState(true);
    const [basketItems, setBasketItems] = useState([]);
    const arr = [];


    const ShowBasketItems = async ()=>{
        //console.log(userAuth.id)
        await axios.get(`http://localhost:5000/api/booksId?userId=${userAuth.id}`)
            .then((response)=>{setBasketItems(response.data);
               // console.log(response.data);
                (response.data).forEach(i => {
                    arr.push(i.book)
                })
               // console.log(arr);
setBasketItems(arr);

                    })
            .catch((e)=>{alert(e)})
        await setIsLoading(true);
    }

     useEffect(ShowBasketItems, [])


    return (

        isLoading
        ?
        <Row className="d-flex">
            {basketItems.map(i =>
                   // console.log(i.price)

                <BooksItem key = {i.id} books={i}/>
            )}

        </Row>
            :
            <div/>
    );
}
export default Basket;

