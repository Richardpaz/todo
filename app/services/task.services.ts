
export const getTasks = async () => {
    const data = await fetch('/api/tasks')
    const result = await data.json()
    return result.data
}

