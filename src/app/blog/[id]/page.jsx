import React from "react";
import styles from "./page.module.css"
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlogData(id){
    const result = await fetch(`http://localhost:3000/api/posts/${id}`)
    if(!result.ok){
        return notFound()
    }
    return result.json()
}

export async function generateMetadata({ params }) { // get dyanmic metadata
    const post = await getBlogData(params.id)
    return {
      title: post.title,
      description: post.desc,
    };
  }

export default async function BlogPost({params}){
    const dataBlog = await getBlogData(params.id)
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {dataBlog.title}
                    </h1>
                    <p className={styles.desc}>
                        {dataBlog.content}
                    </p>
                    <div className={styles.author}>
                        <Image src={dataBlog.img} width={40} height={40} className={styles.avatar} alt="blogpic"/>
                        <span className={styles.username}>username</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                <Image
                    src={dataBlog.img}
                    alt="Main Blog Image"
                    fill={true}
                    className={styles.image}
                />
                </div> 
            </div>
        </div>
    )
}