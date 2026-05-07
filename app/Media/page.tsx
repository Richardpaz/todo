"use client";

import { Suspense, useEffect } from "react";
import { useTaskstore } from "../store/task.store";
import { CardTask } from "../components/CardTask";
import { Flex } from "@radix-ui/themes";
import { NoTask } from "../components/NoTasks";

function Media() {

    const tasks = useTaskstore((state) => state.tasks);
    const getTasksPrioridad = useTaskstore(
        (state) => state.getTasksPrioridad
    );

    useEffect(() => {
        getTasksPrioridad("media");
    }, [getTasksPrioridad]);


   if (!tasks) return <p>Cargando..</p>
    
   return (
        tasks.length === 0 ?
            <NoTask /> :
            <Suspense fallback={<p>Cargando...</p>}>
                <Flex direction={"column"} gap={"2"}>
                    {tasks.map((task) => (
                        <CardTask key={task.id} task={task} />
                    ))}
                </Flex>
            </Suspense>

    );
}

export default Media;