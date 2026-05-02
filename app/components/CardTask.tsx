import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { tasks } from "../tasks";

export function CardTask({ task }) {

    const statusColors = {
        "todo": "orange",
        "in-progress": "blue",
        "done": "green"
    }

    return (
        <Card>
            <Flex direction={"column"} gap={"2"}>
                <Heading size={"3"}>{task.title}</Heading>
                <Text size={"1"} weight={"light"}>{task.description}</Text>
                <Text size={"2"} color={statusColors[task.status]}>Estado: {task.status}</Text>

            </Flex>
        </Card>
    )
}