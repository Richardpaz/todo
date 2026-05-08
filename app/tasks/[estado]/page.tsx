"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getEstado } from "../../services/task.services"
import { z } from "zod"
import { CardTask } from "@/app/components/CardTask";
import { NoTask } from "@/app/components/NoTasks";

const taskSchema = z.object({
    id: z.string().optional(),
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    prioridad: z.enum(["baja", "media", "alta"]),
    estado: z.enum(["todo", "in-progress", "done"])
})

type typeTask = z.infer<typeof taskSchema>

function Estados() {
    const params = useParams<typeTask>()
    const [estado, setEstado] = useState<typeTask[]>()

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getEstado(params.estado)
            setEstado(data)
        }
        fetchTasks()
    }, [])

    console.log(estado)
    if (!estado) return <p>Cargando..</p>

    return (
        estado.length === 0 ?
            <p>Cargando..</p>:
            estado.map((task: typeTask) => (
                <CardTask key={task.id} task={task} />
            ))
    )
}

export default Estados;