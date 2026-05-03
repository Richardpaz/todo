import supabase from "../../libs/supabase"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
export async function GET(req: NextRequest) {
    const { data } = await supabase.from('Tasks').select('*')
    return NextResponse.json({ data })
}