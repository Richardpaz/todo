"use client"
import { CardTask } from "./components/CardTask"
import { Flex } from "@radix-ui/themes"
import { useTaskstore } from "./store/task.store"
import { useEffect } from "react";
import { z } from "zod"
import { id } from "zod/locales";
import { NoTask } from "./components/NoTasks";

const taskSchema = z.object({
    id: z.string().optional(),
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    prioridad: z.enum(["baja", "media", "alta"]),
    estado: z.enum(["todo", "in-progress", "done"])
})

type typeTask = z.infer<typeof taskSchema>


function Dashboard() {
    const tasks = useTaskstore<typeTask[]>((state) => state.tasks)
    const fetchTasks = useTaskstore((state) => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    if (tasks.length === 0) return <NoTask />

    return (
        tasks.length === 0 ?
            <p>Cargando..</p> :
            <Flex gap={"2"} direction={"column"}>
                {tasks?.map((task) => (
                    <CardTask key={task.id} task={task} />
                ))}
            </Flex>
    )
}
export default Dashboard