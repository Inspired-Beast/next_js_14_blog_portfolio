import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async(request, {params}) =>{

    try{
        await connect()
        const post = await Post.findById(params.id)
        return NextResponse.json(post)
    } catch(err){
        return new NextResponse("Unable to fetch data", {status:500})
    }
}

export const DELETE = async(request, {params}) => {
    const {id}  = params;
    try{
        await connect()
        await Post.findByIdAndDelete(id)
        return new NextResponse("Deleted post", {status:201})
    }catch(err){
        return new NextResponse("Unable to delete data", {status:500})
    }
}