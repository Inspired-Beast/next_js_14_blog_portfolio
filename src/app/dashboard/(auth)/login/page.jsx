"use client"
import React from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () =>{
    const session = useSession()
    const router = useRouter()
    const [err, setErr] = useState(false)

    if(session.status==="loading"){
        return <p>Loading...</p>;
    }

    if(session.status==="authenticated"){
        router?.push("/dashboard")
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        signIn("credentials", {
            email,
            password,
        })
    }
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="email" placeholder="email" className={styles.input} required />
                <input type="password" placeholder="password" className={styles.input} required />
                <button className={styles.button}>Login</button>
                {err && "Something went wrong!"}
            </form>
            <button className={styles.button} onClick={()=>{signIn("google")}}>Login with Google</button>
            <Link href="/dashboard/register">Create a New Account</Link>
        </div>
    )
}

export default Login