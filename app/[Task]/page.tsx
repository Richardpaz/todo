"use client"

import {
    Flex,
    TextArea,
    TextField,
    Text,
    Button,
    Select
} from "@radix-ui/themes"

import { useParams, useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const taskSchema = z.object({
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    prioridad: z.enum(["baja", "media", "alta"]),
    estado: z.enum(["todo", "in-progress", "done"])
})

type TaskData = z.infer<typeof taskSchema>

function Task() {

    const params = useParams<{ Task: string }>()
    const router = useRouter()

    const [task, setTask] = useState<TaskData | null>(null)

    const { register, handleSubmit, control, reset } =
        useForm<TaskData>({
            resolver: zodResolver(taskSchema)
        })

    useEffect(() => {
        const getTask = async () => {
            const res = await fetch(`/api/${params.Task}`)
            const json = await res.json()
            setTask(json.data[0])
            reset(json.data[0]) // ⭐ valores DB
        }

        getTask()
    }, [params.Task, reset])

    const handleGuardar = async (data: TaskData) => {
        const res = await fetch(`/api/${params.Task}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await res.json()
        console.log(json)
        router.push("/")
    }

    const handleDelete = async () => {
        await fetch(`/api/${params.Task}`, {
            method: "DELETE"
        })
        router.push("/")
    }

    if (!task) return <p>Cargando...</p>

    return (
        <form onSubmit={handleSubmit(handleGuardar)}>

            <Flex direction="column" gap="2" width="550px">

                <Text>Titulo</Text>
                <TextField.Root {...register("titulo")} />

                <Text>Descripcion</Text>
                <TextArea {...register("descripcion")} />

                <Text>Estado</Text>

                <Controller
                    name="estado"
                    control={control}
                    render={({ field }) => (
                        <Select.Root
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="todo">Hacer</Select.Item>
                                <Select.Item value="in-progress">En progreso</Select.Item>
                                <Select.Item value="done">Hecho</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    )}
                />

                <Text>Prioridad</Text>

                <Controller
                    name="prioridad"
                    control={control}
                    render={({ field }) => (
                        <Select.Root
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="baja">baja</Select.Item>
                                <Select.Item value="media">media</Select.Item>
                                <Select.Item value="alta">alta</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    )}
                />

                <Flex gap="2" justify="end">

                    <Button
                        type="button"
                        variant="outline"
                        color="red"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>

                    <Button
                        type="submit"
                        color="green"
                        variant="outline"
                        style={{ width: "200px" }}
                    >
                        Guardar
                    </Button>

                </Flex>

            </Flex>

        </form>
    )
}

export default Task