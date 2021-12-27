import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateBooks from "../components/modals/CreateBooks";
import CreateType from "../components/modals/CreateType";
import DeleteBook from "../components/modals/DeleteBook";


const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [booksVisible, setBooksVisible] = useState(false)
    // const [deleteVisible, setDeleteVisible] = useState(false)


    return (

        <Container className="d-flex flex-column">

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить жанр
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить издательство
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBooksVisible(true)}
            >
                Добавить книгу
            </Button>
            {/*<Button*/}
            {/*    variant={"outline-dark"}*/}
            {/*    className="mt-4 p-2"*/}
            {/*    onClick={() => setDeleteVisible(true)}*/}
            {/*>*/}
            {/*    Удалить книгу*/}
            {/*</Button>*/}

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateBooks show={booksVisible} onHide={() => setBooksVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            {/*<DeleteBook show={deleteVisible} onHide={() => setDeleteVisible(false)}/>*/}

        </Container>
    );
};

export default Admin;
