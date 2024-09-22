import React from "react";
import styles from "./footer.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return(
        <div className={styles.container}>
            <div>©️2024 Vishav. All Rights Reserved </div>
            <div className={styles.social}>
                <Link href="https://facebook.com">
                    <Image src="/1.png" width={15} height={15} className={styles.icon} alt="Facebook Account" />
                </Link>
                <Link href="https://instagram.com">
                    <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Social Instagram" />
                </Link >
                <Link href="https://twitter.com">
                    <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Social Twitter" />
                </Link>
                <Link href="https://youtube.com">
                    <Image src="/4.png" width={15} height={15} className={styles.icon} alt="Social Youtube" />
                </Link>
            </div>
        </div> 
    )
}