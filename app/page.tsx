import { tasks } from "@/app/tasks"
import { CardTask } from "./components/CardTask"
import { Flex } from "@radix-ui/themes"

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  project: string;
  tags: string[];
  dueDate: string;
  createdAt: string;
};

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