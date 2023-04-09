import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";

function Todo() {
    const [addTaskInputValue, setAddTaskInputValue] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);

    // Handlers
    const handleAddTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTaskInputValue(event.target.value);
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTasks([...tasks, addTaskInputValue]);
        setAddTaskInputValue('');
    };

    return (
        <div className="container">
            <h1 className="display-6">Todo List</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" value={addTaskInputValue} onChange={handleAddTaskInputChange}/>
                        <Button type="submit" variant="primary">
                            Add
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    {
                        tasks.map((task, index) => {
                            return (
                                <InputGroup className="mb-3" key={index}>
                                    <InputGroup.Checkbox className="mt-0" />
                                    <Form.Control type="text" value={task}/>
                                </InputGroup>
                            );
                        })
                    }
                </Form.Group>
            </Form>
        </div>
    );
}

export default Todo;
