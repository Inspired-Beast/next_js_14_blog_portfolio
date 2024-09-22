import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData(){
    const res = await fetch('http://localhost:3000/api/posts',{next:{revalidate:100}})
    if(!res.ok){
        throw new Error("Failed to fetch data !!!");
    }
    return res.json()
}

export default async function Blog (){
    const data = await getData() // using async directly we can fetch data on server side
    return(
        <div className={styles.mainContainer}>
            {data.map((item)=>(
                <Link href={`blog/${item._id}`} className={styles.container} key={item._id}>
                    <div className={styles.imageContainer}>
                        <Image src={item.img} width={400} height={250} alt="blog data"/>
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <p className={styles.desc}>{item.desc}</p>
                    </div>
                </Link>
            ))}
            
        </div>
    )
}