"use client"
import { Flex, TextField, Text, TextArea, Button, Select, Callout } from "@radix-ui/themes";
import { z } from "zod";
import React from "react";
import { useForm, Controller } from "react-hook-form"
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
    titulo: z.string().min(1, "El título es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    prioridad: z.enum(["baja", "media", "alta"], "La prioridad debe ser baja, media o alta"),
})

type TaskData = z.infer<typeof taskSchema>;

function AddTask() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<TaskData>({
        resolver: zodResolver(taskSchema)
    });
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();

    const submit = async (data: TaskData) => {
        console.log(data);
        const validarData = taskSchema.safeParse(data);
        if (!validarData.success) {
            console.log(validarData.error);
            return;
        }
        try {
            const fechData = fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await fechData;
            console.log(response);
            router.push("/");
            setSuccess(true);
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    }

const handleCancelar = ()=>{
    router.push("/")
}

    return (
        success === false ?
            <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-4 justify-center m-auto w-full">
                <Flex direction={"column"} gap={"2"} width={"500px"} >
                    <Text size={"3"}>Agregar nueva tarea</Text>
                    <TextField.Root placeholder="Título de la tarea" {...register("titulo", {
                        required: {
                            value: true,
                            message: "El título es requerido"
                        }
                    })} />
                    {errors.titulo && <Text size={"1"} color={"red"}>{errors.titulo.message}</Text>}
                    <Text size={"2"} weight={"light"}>Descripción breve de la tarea</Text>
                    <TextArea placeholder="Breve Descripcion..." resize={"none"} maxLength={200} size={"3"} className="h-30" {...register("descripcion", {
                        required: {
                            value: true,
                            message: "La descripción es requerida"
                        }
                    })}></TextArea>
                    {errors.descripcion && <Text size={"1"} color={"red"}>{errors.descripcion.message}</Text>}
                    <Text size={"2"} weight={"light"}>Prioridad</Text>
                    <Controller name="prioridad" control={control} render={({ field }) => (
                        <Select.Root value={field.value} onValueChange={field.onChange}>
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="baja">Baja</Select.Item>
                                <Select.Item value="media">Media</Select.Item>
                                <Select.Item value="alta">Alta</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    )} />
                    {errors.prioridad && <Text size={"1"} color={"red"}>{errors.prioridad.message}</Text>}
                  
                    <Flex gap={"2"} direction={"row"} justify={"end"}>
                        <Button variant={"outline"} color="brown" onClick={handleCancelar}>Cancelar</Button>
                        <Button variant={"outline"} color={"green"} className="w-80" style={{ width: "150px" }}>Guardar</Button>
                    </Flex>
                </Flex>
            </form> :
            <Callout.Root color="green" className="flex flex-col items-center gap-4 justify-center m-auto">
                <Callout.Text className="flex flex-row items-center gap-2">
                    <CheckCircledIcon className={"w-10 h-10"} />
                    <Text size={"3"}>Tarea creada con éxito</Text>
                </Callout.Text>
            </Callout.Root>
    )
}
export default AddTask;