import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";

function Todo() {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('form submitted');
    };

    return (
        <div className="container">
            <h1 className="display-6">Todo List</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control type="text"></Form.Control>
                        <Button type="submit" variant="primary">
                            Add
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Todo;
