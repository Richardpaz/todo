"use client"
import { CardTask } from "./components/CardTask"
import { Flex } from "@radix-ui/themes"
import { useTaskstore } from "./store/task.store"
import { useEffect } from "react";

function Dashboard() {
    const tasks = useTaskstore((state) => state.tasks)
    const fetchTasks = useTaskstore((state) => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return (
        <Flex gap={"2"} direction={"column"}>
            {tasks?.map((task) => (
                <CardTask key={task.id} task={task} />
            ))}
        </Flex>
    )
}
export default Dashboard