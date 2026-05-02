import { tasks } from "@/app/tasks"
import { CardTask } from "./components/CardTask"
import { Flex } from "@radix-ui/themes"

function Dashboard() {
    console.log(tasks)
    return (
        <Flex gap={"2"} direction={"column"}>
            {tasks.map((task) => (
                <CardTask key={task.id}  task={task}/>
            ))}
        </Flex>
    )
}
export default Dashboard