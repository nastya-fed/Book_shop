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
    const [bItems, setBItems] = useState([]);
    const arr = [];const arr2=[];


    const ShowBasketItems = async ()=>{
        //console.log(userAuth.id)
        await axios.get(`http://localhost:5000/api/booksId/r/?userId=${userAuth.id}`)
            .then((response)=>{setBasketItems(response.data);
                console.log(response.data);

               // console.log(response.data);
                (response.data).forEach(i => {
                    console.log(i)
                    arr.push(i)
                    arr2.push(i.conn)
                })
                console.log(arr);
setBasketItems(arr);
                setBItems(arr2);

                    })
            .catch((e)=>{alert(e)})
        await setIsLoading(true);
    }

     useEffect(ShowBasketItems, [])

let sum=0;
    return (

        isLoading
        ?
            <ul className="list-group">
                <ol >
                    {basketItems.map (i =>
                        <li className="list-group-item ">
                            <BooksItem key = {i.id} books={i.book}/>
                            <div className="d-flex align-content-between border flex-wrap h-5 mb-3"> </div>
                            <span className="font-weight-bold">Количество</span>: <span className="font-italic ml-5"><big>{i.conn}</big></span>
                            <div className="font-weight-bold" src={sum = sum + Number(i.conn)*i.book.price}>Общая цена:<span className="badge-info bg-danger  ml-5"><big>{Number(i.conn)*i.book.price}</big></span></div>

                    </li>

            )}


                    <br/>
                        <h1 align="center">Итого: {sum}</h1>

        </ol>

            </ul>


            :
            <div/>
    );
}
export default Basket;

