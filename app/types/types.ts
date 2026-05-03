export type Task = {
    id: string;
    titulo: string;
    descripcion: string;
    estado: "todo" | "in-progress" | "done";
    project: string;
    tags: string[];
    dueDate: string;
    createdAt: string;
};