import supabase from "../../libs/supabase"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const { data } = await supabase.from('Tasks').select('*')
    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const {titulo,descripcion,estado,prioridad} = await req.json()
    const { data, error } = await supabase
        .from('Tasks')
        .insert([{ titulo, descripcion,prioridad}])
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
}