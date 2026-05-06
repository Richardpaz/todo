import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

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
        <Link href={`/${task.id}`}>
            <Card>
                <Flex direction={"column"} gap={"2"}>
                    <Heading size={"2"}>{task.titulo}</Heading>
                    <Text size={"1"} weight={"light"}>{task.descripcion}</Text>
                    <Text size={"2"} color={statusColors[task.estado]}>Estado: <Badge color={statusColors[task.estado]}>{task.estado}</Badge></Text>
                </Flex>
            </Card>
        </Link>
    )
}