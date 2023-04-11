import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import genUniqueId from "./helpers";

interface Task {
    id: number,
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
            id: genUniqueId(),
            task: addTaskInputValue,
            isCompleted: false,
        };
        setTasks([...tasks, newTask]);
        setAddTaskInputValue('');
    };
    const handleDeleteTask = (taskToDelete: Task) => {
        const newTasks = tasks.filter(task => task.id !== taskToDelete.id);
        setTasks(newTasks);
    }
    const handleTaskChange = (changedTask: Task, e: React.ChangeEvent<HTMLInputElement>) => {
        const oldTask = tasks.find(task => task.id === changedTask.id);
        if (oldTask === undefined) {
            throw new Error();
        }
        const newTask = {
            id: oldTask.id,
            task: e.target.value,
            isCompleted: oldTask.isCompleted,
        };
        const newTasks = tasks.map(task => task.id === newTask.id ? newTask : task);
        setTasks(newTasks);
    };
    const handleCheckboxChange = (changedTask: Task, e: React.ChangeEvent<HTMLInputElement>) => {
        const newTask = {
            ...changedTask,
            isCompleted: e.target.checked,
        }
        const newTasks = tasks.map(task => task.id === newTask.id ? newTask : task);
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
                        tasks.map(task => {
                            return (
                                <InputGroup className="mb-3" key={task.id}>
                                    <InputGroup.Checkbox className="mt-0" checked={task.isCompleted} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(task, e)} />
                                    <Form.Control type="text" value={task.task} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTaskChange(task, e)}/>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => handleDeleteTask(task)}
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
