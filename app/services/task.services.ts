import supabase from "../libs/supabase";

export const getTasks = async () => {
    let { data } = await supabase.from('Tasks').select('*')
    return data
}