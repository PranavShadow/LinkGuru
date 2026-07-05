// this file is for routing of the links

import { classifyUrl } from "@/src/lib/classify";
import { fetchMetaData } from "@/src/lib/metadata";
import { supabase } from "@/src/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request){
    const session = await getServerSession(authOptions)
    if(!session?.user)
        return Response.json({error: "Unauthorized"}, {status: 401})


    const {url} = await req.json()
    if(!url)
        return Response.json({error: "Url is Required"}, {status: 400})

    const[app, meta] = await Promise.all([
        Promise.resolve(classifyUrl(url)),
        fetchMetaData(url)
    ])

    const {error} = await supabase.from("links").insert({
        user_id: session.user.id,
        url,
        app,
        title : meta.title,
        description : meta.description,
        image : meta.image,
        favicon : meta.favicon
    })

    if(error)
        return Response.json({error : error.message}, {status: 500})

    return Response.json({success : true, app, meta})
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user) 
        return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams} = new URL(req.url)
    const app = searchParams.get("app")

    let query = supabase.from("links")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", {ascending: false})

    if(app)
        query = query.eq("app", app)

    const {data, error} = await query

    if(error)
        return Response.json({error: error.message}, {status: 500})

    return Response.json({links:data})
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return Response.json({ error: "ID required" }, { status: 400 })

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id)


  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}