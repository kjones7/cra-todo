import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import genUniqueId from "./helpers";
import Task from "./task";
import TaskItem from "./TaskItem";

function Todo() {
    const [addTaskInputValue, setAddTaskInputValue] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const unparsedTasks = localStorage.getItem('tasks');
        if (unparsedTasks !== null) {
            setTasks(JSON.parse(unparsedTasks));
        }
    }, []);

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
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        storeTasks(newTasks);
        setAddTaskInputValue('');
    };

    // Helpers
    const storeTasks = (tasks: Task[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // JSX builders
    const createTaskItems = ({tasks, isCompleted}: {tasks: Task[], isCompleted: boolean}) => {
        return tasks.reduce((acc: JSX.Element[], task: Task) => {
            if (task.isCompleted === isCompleted) {
                acc.push(
                    <TaskItem
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                        key={task.id}
                        storeTasks={storeTasks}
                    />
                );
            }

            return acc;
        }, []);
    };

    // JSX arrays
    const incompleteTasks = createTaskItems({
        tasks: tasks,
        isCompleted: false,
    });
    const completedTasks = createTaskItems({
        tasks: tasks,
        isCompleted: true,
    });

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
                    {incompleteTasks}
                </Form.Group>
                <Form.Group>
                    <h6>Completed</h6>
                    {completedTasks}
                </Form.Group>
            </Form>
        </div>
    );
}

export default Todo;
