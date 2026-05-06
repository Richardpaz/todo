import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "../../libs/supabase";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { data } = await supabase.from('Tasks').select('*').eq('id', id)
    if (data?.length === 0) {
        return NextResponse.json({ message: "No se encontro la tarea" })
    }
    return NextResponse.json({ data })
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { titulo, descripcion, estado } = await req.json()
    const { id } = await params
    const { data, error } = await supabase
        .from('Tasks')
        .update({ "titulo": titulo, "descripcion": descripcion, "estado": estado })
        .eq("id", id)
        .select()
    return NextResponse.json({ data })
}