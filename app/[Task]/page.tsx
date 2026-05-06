"use client"
import { Flex, TextArea, TextField, Text, Button, Select } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { id } from "zod/locales";


const taskSchema = z.object({
    id: z.string().min(1),
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    prioridad: z.enum(["baja", "media", "alta"]),
    estado: z.enum(["todo", "in-progress", "done"])
});

type TaskData = z.infer<typeof taskSchema>;

function Task() {
    const params = useParams<{ Task: string }>();
    const router = useRouter();
    const [data, setData] = useState<TaskData[]>([])
    const { register, handleSubmit, watch, control } = useForm<TaskData>({ resolver: zodResolver(taskSchema) });
    useEffect(() => {
        const getTask = async () => {
            const data = await fetch(`/api/${params.Task}`)
            const res = await data.json()
            setData(res.data);
        }
        getTask()
    }, [params.Task])
    console.log(data)

    const submit = async (datos: TaskData) => {
        try {
            const res = await fetch(`/api/${params.Task}`, {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const datas = await res.json()
            console.log(datas)
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/${params.Task}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        router.push("/")
    }
    return (
        data?.map(e =>
            <form key={e.id} onSubmit={handleSubmit(submit)}>
                <Flex direction={"column"} gap={"2"} width={"550px"}>
                    <Text>Titulo</Text>
                    <TextField.Root defaultValue={e.titulo} {...register("titulo")}></TextField.Root>
                    <Text>Descripcion</Text>
                    <TextArea defaultValue={e.descripcion} {...register("descripcion")}></TextArea>
                    <Text>Estado</Text>
                    <Controller name="estado" control={control} render={({ field }) =>
                        <Select.Root defaultValue={e.estado} value={field.value} onValueChange={field.onChange}>
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="todo">Hacer</Select.Item>
                                <Select.Item value="in-progress">En progreso</Select.Item>
                                <Select.Item value="done">Hecho</Select.Item>
                            </Select.Content>
                        </Select.Root>}
                        {...Controller}
                    />
                    <Flex direction={"row"} gap={"2"} justify={"end"}>
                        <Button variant="outline" color="red" onClick={handleDelete}>Eliminar</Button>
                        <Button color="green" variant="outline" style={{ width: "200px" }}>Guardar</Button>
                    </Flex>
                </Flex>
            </form>
        )
    )
}

export default Task;