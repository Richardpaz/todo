import supabase from "@/app/libs/supabase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { estado } = await req.json()
    const { data } = await supabase.from('Tasks').select('*').eq('estado', estado)
    return NextResponse.json(data)
}