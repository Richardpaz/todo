import { create } from "zustand";
import { getTasks, createTask, getPrioridad } from "../services/task.services";
import { Task } from "../types/types";



type TaskStore = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Task) => Promise<void>;
    getTasksPrioridad: (task: string) => Promise<void>;
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
    },
    getTasksPrioridad: async (task: string) => {
        const newTasks = await getPrioridad(task)
        set({ tasks: newTasks || [] })
    }
}))