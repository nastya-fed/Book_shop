import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createOrder, createType} from "../../http/booksAPI";

const CreateOrder = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const addType = () => {


            onHide()
        alert('sps')

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформление заказа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                         onChange={e => setValue(e.target.value)}
                        placeholder={"E-mail"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Body>
                <Form>
                    <Form.Control
                        valuer={name}

                          onChange={e => setName(e.target.name)}
                         placeholder={"Номер телефона"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOrder;