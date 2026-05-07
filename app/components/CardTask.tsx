import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { z } from "zod"

const taskSchema = z.object({
    id: z.string().optional(),
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    prioridad: z.enum(["baja", "media", "alta"]),
    estado: z.enum(["todo", "in-progress", "done"])
})

type Task = z.infer<typeof taskSchema>

export function CardTask({ task }: { task: Task }) {

    const statusColors = {
        todo: "orange",
        "in-progress": "blue",
        done: "green",
    } as const;

    const prioridadColor = {
        baja: "blue",
        media: "yellow",
        alta: "red",
    } as const

    return (
        <Link href={`/${task.id}`}>
            <Card className="w-200">
                <Flex direction={"column"} gap={"2"}>
                    <Heading size={"2"}>{task.titulo}</Heading>
                    <Text size={"1"} weight={"light"}>{task.descripcion}</Text>
                    <Text size={"2"} color={statusColors[task.estado]}>Estado: <Badge color={statusColors[task.estado]}>{task.estado}</Badge></Text>
                    <Text size={"2"} color={prioridadColor[task.prioridad]}>Prioridad : {task.prioridad}</Text>
                </Flex>
            </Card>
        </Link>
    )
}