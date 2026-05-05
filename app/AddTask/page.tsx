"use client"
import { Flex, TextField, Text, TextArea, Button, Select } from "@radix-ui/themes";

function AddTask() {

    const handleSubmit = async () => {
        const titulo = "Titulo de prueba"
        const descripcion = "Descripcion de prueba"
        const data = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ titulo, descripcion })
        })
        const result = await data.json()
        console.log(result)
    }
    return (
        <Flex direction={"column"} gap={"2"} width={"500px"}>
            <Text size={"3"}>Agregar nueva tarea</Text>
            <TextField.Root placeholder="Título de la tarea" />
            <Text size={"2"} weight={"light"}>Descripción breve de la tarea</Text>
            <TextArea placeholder="Breve Descripcion..." resize={"none"} maxLength={200} size={"3"} className="h-30"></TextArea>
            <Text size={"2"} weight={"light"}>Prioridad</Text>
            <Select.Root defaultValue="medium">
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="low">Baja</Select.Item>
                    <Select.Item value="medium">Media</Select.Item>
                    <Select.Item value="high">Alta</Select.Item>
                </Select.Content>
            </Select.Root>
            <Flex gap={"2"} direction={"row"} justify={"end"}>
                <Button variant={"outline"}>Cancelar</Button>
                <Button variant={"solid"} className="w-80" style={{ width: "150px" }} onClick={handleSubmit}>Guardar</Button>
            </Flex>
        </Flex>
    )
}
export default AddTask;