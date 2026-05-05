import { create } from "zustand";
import { getTasks, createTask } from "../services/task.services";
import { Task } from "../types/types";
import { stat } from "fs/promises";
type TaskStore = {
    tasks: Task[];
    loading: boolean;
    error: string | null;

    fetchTasks: () => Promise<void>;
};

export const useTaskstore = create<TaskStore>((set) => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
        set({ loading: true, error: null })
        const tasks = await getTasks()
        set({ tasks: tasks || [], loading: false })
    },
    addTask: async (task: Task) => {
        const newTask = await createTask(task.titulo, task.descripcion)
        set((state) => ({ tasks: [...state.tasks, newTask] }))
    }
}))