
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

