export type Task = {
    id: string;
    titulo: string;
    descripcion: string;
    estado: "todo" | "in-progress" | "done";
    prioridad: "alta" | "media" | "baja";

};