
export const getTasks = async () => {
    const data = await fetch('/api/tasks')
    const result = await data.json()
    return result.data
}

export const createTask = async (titulo: string, descripcion: string) => {
    const data = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ titulo, descripcion })
    })
    const result = await data.json()
    return result.data
}

export const getTask = async (id: string) => {
    const data = await fetch(`/api/${id}`)
    const result = await data.json()
    return result.data
}

export const getPrioridad = async (prioridad: string) => {
    const data = await fetch('/api/prioridad', {
        method: 'POST',
        body: JSON.stringify({ prioridad })
    })
    const result = await data.json()
    return result
}

export const getEstado = async (estado: string) => {
    const data = await fetch('/api/estado', {
        method: 'POST',
        body: JSON.stringify({ estado })
    })
    const result = await data.json()
    return result
}
