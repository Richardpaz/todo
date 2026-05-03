import supabase from "../libs/supabase";

export const getTasks = async () => {
    const  { data } = await supabase.from('Tasks').select('*')
    return data
}