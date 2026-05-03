import { Card, Flex, Heading, Text } from "@radix-ui/themes";

type Task = {
    id: string;
    titulo: string;
    descripcion: string;
    estado: "todo" | "in-progress" | "done";
}

export function CardTask({ task }: { task: Task }) {

const statusColors = {
  todo: "orange",
  "in-progress": "blue",
  done: "green",
} as const;

    return (
        <Card>
            <Flex direction={"column"} gap={"2"}>
                <Heading size={"2"}>{task.titulo}</Heading>
                <Text size={"1"} weight={"light"}>{task.descripcion}</Text>
                <Text size={"2"} color={statusColors[task.estado]}>Estado: {task.estado}</Text>
            </Flex>
        </Card>
    )
}