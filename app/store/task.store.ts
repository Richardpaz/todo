import { create } from "zustand";
import * as services from "../services/task.services";
import { Task } from "../types/types";
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
        const tasks = await services.getTasks()
        set({ tasks : tasks || [], loading: false })
    },
    addTask:async ()=>{
        const newTask = await services.addTask()
        set({ loading: true, error: null })
    }
}))