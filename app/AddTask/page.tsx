import { Flex, TextField,Text, TextArea } from "@radix-ui/themes";

function AddTask() {
    return (
        <Flex direction={"column"} gap={"2"}>
            <Text size={"3"}>Agregar nueva tarea</Text>
            <TextField.Root placeholder="Título de la tarea" className="w-100" />
            <Text size={"2"} weight={"light"}>Descripción breve de la tarea</Text>
            <TextArea placeholder="Breve Descripcion..." resize={"none"}   maxLength={200} size={"3"} className="w-150 h-30"></TextArea>
            </Flex>
    )
}
export default AddTask;