import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import genUniqueId from "./helpers";
import Task from "./task";
import TaskItem from "./TaskItem";

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
                                <TaskItem
                                    task={task}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    key={task.id}
                                />
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
