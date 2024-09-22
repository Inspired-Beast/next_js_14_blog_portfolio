import { NextResponse } from "next/server"
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {

    const url = new URL(request.url)
    const username = url.searchParams.get("username")

    try {
      await connect();
      const posts = await Post.find(username && {username}); // if there is a username search for that username otherwise fetch all data
      return NextResponse.json(posts);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch posts!");
    }
  };

export const POST = async (request)=>{
  const body = await request.json();
  const newPost = new Post(body);

  try{
    await  connect()
    await newPost.save()
    return NextResponse("Post saved to DB", {status:201})
  }catch(err){
    throw new Error("Failed to save data to DB", {status:500})
  }
}