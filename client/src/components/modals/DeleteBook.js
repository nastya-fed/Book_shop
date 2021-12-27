// import React, {useEffect, useState} from "react";
// import { useParams, useHistory } from 'react-router-dom'
//
// import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
//
//
// import {DeleteBookById} from "../../http/booksAPI";
//
//
// const DeleteBook = () => {
//     let history = useHistory();
//     let { id } = useParams();
//
//
//     const DeleteBooks = async () => {
//         try{
//               await DeleteBookById(id)
//             history.push('/id');
//         }catch(e){
//             alert('Возникла ошибка')
//         }
//     }
//
//
//     return (
//         <div className='deletebook'>
//             <Form.Control
//                 value={id}
//                 onChange={e => setBook(Number(e.target.value))}
//                 className="mt-3"
//                 placeholder="Введите стоимость книги"
//                 type="number"
//             />
//             <Button variant="danger" onClick={DeleteBooks}> Удалить </Button>
//         </div>
//     );
// }
//
// export default DeleteBook;