'use client'

import React from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import connect from "@/utils/db";

export default function Dashboard(){
    
    //use Session
    const session = useSession() // note this has to be at the top of the component
    console.log(session)

    const router = useRouter()

    //fetch data using useSWR
    const fetchData = (...url)=> fetch(...url).then(res=>res.json())
    const {data, mutate, error, isLoading} = useSWR(`/api/posts/?username=${session?.data?.user.name}`, fetchData)
    console.log(data)
    if(error){
        return notFound()
    }

    if(session.status==='loading'){
        return <p>Loading.......</p>
    }
    if(session.status==='unauthenticated'){
        router?.push("/dashboard/login")
    }

    const handleSubmit  = async(e)=>{
        e.preventDefault();
        const title = e.target[0].value
        const desc = e.target[1].value
        const img = e.target[2].value
        const content = e.target[3].value

        try{
            await fetch("/api/posts", {
                method:"POST",
                body: JSON.stringify({
                    title, desc, img, content, username:session.data.user.name
                })
            })
            mutate() // helps get new data as soon as we save our post in DB
            e.target.reset()
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async(id)=>{
        try{
            await fetch(`/api/posts/${id}`,{
                method:"DELETE"
            });
            mutate()
        }catch(err){
            console.log(err)
        }
    }
    if(session.status==="authenticated"){
        return(
            <div className={styles.container}>
                <div className={styles.posts}>
                {isLoading ?"Loading":data.map((post)=>
                  <div className={styles.post}>
                    <div className={styles.imgContainer}>
                        <Image src={post.img} alt="post image" width={200} height={100}/>
                    </div>
                    <h2 className={styles.postTitle}>
                        {post.title}
                    </h2>
                    <span className={styles.delete} onClick={()=>handleDelete(post._id)}>X</span>
                  </div>  
                    )}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add New Post</h1>
                    <input type="text" placeholder="Title" className={styles.input} />
                    <input type="text" placeholder="Desc" className={styles.input} />
                    <input type="text" placeholder="Image" className={styles.input} />
                    <textarea placeholder="Content" className={styles.textArea} col="30" rows="10"></textarea>
                    <button className={styles.button}>Save Post</button>
                </form>
            </div>
        )
    }
}