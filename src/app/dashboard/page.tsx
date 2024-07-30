"use client";

import { FC, useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'

interface pageProps {

}

interface Task {
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Under Review" | "Finished";
    priority?: "Low" | "Medium" | "Urgent";
    deadline?: string;
}

const page: FC<pageProps> = ({ }) => {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | unknown>(null);

    console.log("tasks: ", tasks);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/gettasks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setTasks(data);

            console.log('fetchTasks', data);
            return data;
        } catch (error) {
            console.error('Error fetching tasks:', error);

            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return <div>
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((item) => (
                <Reorder.Item key={item} value={item}>
                    {item}
                </Reorder.Item>
            ))}
        </Reorder.Group>

        <hr />
        <hr />
        {tasks.length !== 0 && tasks.map((task) => (
            <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <p>{task.priority}</p>
                <p>{task.deadline}</p>
            </div>
        ))}
    </div>
}

export default page