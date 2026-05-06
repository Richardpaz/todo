"use client"

import {
  Flex,
  TextArea,
  TextField,
  Text,
  Button,
  Select
} from "@radix-ui/themes";

import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  prioridad: z.enum(["baja", "media", "alta"]),
  estado: z.enum(["todo", "in-progress", "done"])
});

type TaskData = z.infer<typeof taskSchema>;

function Task() {
  const params = useParams<{ Task: string }>();
  const router = useRouter();

  const [task, setTask] = useState<TaskData | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch
  } = useForm<TaskData>({
    resolver: zodResolver(taskSchema),
  });

  // ✅ fetch task
  useEffect(() => {
    const getTask = async () => {
      const res = await fetch(`/api/${params.Task}`);
      const json = await res.json();

      setTask(json.data);

      // ⭐ importante
      reset(json.data);
    };

    getTask();
  }, [params.Task, reset]);

  const submit = async (datos: TaskData) => {
    await fetch(`/api/${params.Task}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    });

    router.push("/");
  };

  console.log(watch());

  if (!task) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Flex direction="column" gap="2" width="550px">

        <Text>Titulo</Text>
        <TextField.Root {...register("titulo")} />

        <Text>Descripcion</Text>
        <TextArea {...register("descripcion")} />

        <Text>Estado</Text>

        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <Select.Root
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="todo">Hacer</Select.Item>
                <Select.Item value="in-progress">En progreso</Select.Item>
                <Select.Item value="done">Hecho</Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        />

        <Flex gap="2" justify="end">
          <Button variant="outline" color="red">
            Eliminar
          </Button>

          <Button color="green" variant="outline">
            Guardar
          </Button>
        </Flex>

      </Flex>
    </form>
  );
}

export default Task;