import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";

interface Task {
    task: string;
    isCompleted: boolean;
}

function Todo() {
    const [addTaskInputValue, setAddTaskInputValue] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    // Handlers
    const handleAddTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTaskInputValue(event.target.value);
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTask = {
            task: addTaskInputValue,
            isCompleted: false,
        };
        setTasks([...tasks, newTask]);
        setAddTaskInputValue('');
    };
    const handleDeleteTask = (index: number) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    }
    const handleTaskChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const oldTask = tasks[index];
        const newTask = {
            task: e.target.value,
            isCompleted: oldTask.isCompleted,
        };
        var newTasks = tasks.map((task, i) => {return i === index ? newTask : task});
        setTasks(newTasks);
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
                                    <Form.Control type="text" value={task.task} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTaskChange(index, e)}/>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => handleDeleteTask(index)}
                                    >
                                        Delete
                                    </Button>
                                </InputGroup>
                            );
                        })
                    }
                </Form.Group>
                <Form.Group>
                    <h6>Completed</h6>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Todo;
