import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState }  from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Csr() {
    const [seafood, setSeafood] = useState([]);
    const getData = async() => {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
        const data = await res.json();

        setSeafood(data.meals);
    }
    useEffect(
        () => {
            getData();
        }, []
    )
    return (
        <div className={styles.container}>
        <Head>
            <title>CSR EXAMPLE</title>
            <link rel="icon" href="/fish.jpg"/>
        </Head>
        <main className={styles.main}>
            <h1 className={styles.title}>
            CSR Page
            </h1>
            <small>Looping seafood array with set read dynamic route</small>
            <div className={styles.grid}>
                {
                    seafood && seafood.length > 0 ? (
                        
                        seafood.map((item, index) => (
                            <Link 
                            href="#"
                            >
                            <a className={styles.card}>
                                <center><Image 
                                src={item.strMealThumb}
                                quality={100}
                                width={100}
                                height={100}
                                loading="lazy"
                                style={{borderRadius: '100px'}}
                                /></center>
                                <small>{item.strMeal} &rarr;</small>
                            </a>
                            </Link>
                        )
                    )):(
                        <p>Loading . . .</p>
                    )
                }
            </div>
        </main>
        </div>
    )
}
