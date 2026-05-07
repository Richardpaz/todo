import { Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export function NoTask() {
    
    return (
        <Card variant="classic" className="w-100 flex flex-col items-center justify-center">
            <Flex direction={"column"} gap={"2"}>
                <Text>No tienes tareas</Text>
                <Text>Crea una tarea</Text>
                <Button color="blue" className="w-8">
                        <Link href={"/AddTask"} className="w-100">
                            Agregar Tarea
                        </Link>
                </Button>
            </Flex>
        </Card>)
}