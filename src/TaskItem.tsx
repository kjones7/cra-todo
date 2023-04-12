import {Button, InputGroup} from "react-bootstrap";
import React from "react";
import Form from "react-bootstrap/Form";
import Task from "./task";

export default function TaskItem({task, tasks, setTasks}: {task: Task, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>}) {
    const handleDeleteTask = (taskToDelete: Task) => {
        const newTasks = tasks.filter(task => task.id !== taskToDelete.id);
        setTasks(newTasks);
    }
    const handleTaskChange = (changedTask: Task, e: React.ChangeEvent<HTMLInputElement>) => {
        const newTask = {
            ...changedTask,
            task: e.target.value,
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
        <InputGroup className="mb-3">
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
}