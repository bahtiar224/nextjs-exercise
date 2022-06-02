import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import {news} from '../../example.js';
import React, {useEffect, useState} from 'react';
import custom from '../../styles/custom.module.css';


export default function Read() {
 const router = useRouter();
 const title = router.query.read;
 const [titles, setTitles] = useState('');
 const [categori, setCategori] = useState('');
 const [content, setContent] = useState('');
 const [image, setImage] = useState('/vercel.svg');
 const [url, setUrl] = useState('https://jatimsmart.id/wp-content/uploads/2020/12/aquarium-tank-cartoon-illustration_1284-21436.jpg');

 useEffect(() => {
  news.map(function(item, index){
    if(item.title == title){
      setTitles(item.title);
      setCategori(item.categori);
      setContent(item.content);
      setImage(item.image);
      setUrl(item.url);
    }
  })
},[router])

  return (
    <div className={styles.container}>
      <Head>
        <title>{titles}</title>
        <link rel="icon" href={image}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
           {titles}
        </h1>
        <div className={custom.news_card}>
          <p className={custom.categories}>{categori}</p>
          <p>{content}</p>
          <Image 
            src={image}
            quality={100}
            width={100}
            height={80}
            loading="lazy"
          />
          <br/>
          <Image 
            src={url}
            quality={100}
            width={300}
            height={180}
            loading="lazy"
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      <style global jsx>
      {`
        body {
          border: 20px solid grey;
        }
      `}
      </style>
    </div>
  )
}
