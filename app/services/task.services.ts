
export const getTasks = async () => {
    const data = await fetch('/api/tasks')
    return data.json()
}

