"use client"
import { Flex, TextArea, TextField, Text, Button, Select } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react";
function Task() {
    const params = useParams();
    const router = useRouter();
    const [data, setData] = useState()
    const { register, handleSubmit, watch, control } = useForm();
    useEffect(() => {
        const getTask = async () => {
            const data = await fetch(`/api/${params.Task}`)
            const res = await data.json()
            setData(res.data);
        }
        getTask()
    }, [])
    console.log(data)

    const submit = async (datos) => {
        try {
            const res = await fetch(`/api/${params.Task}`, {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    console.log(watch())
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
                        <Button variant="outline" color="red">Eliminar</Button>
                        <Button color="green" variant="outline" style={{width:"200px"}}>Guardar</Button>

                    </Flex>
                </Flex>
            </form>
        )
    )
}

export default Task;