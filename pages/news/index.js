import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import {news} from '../../example.js';

export default function IndexNews() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Halaman News
        </h1>
        <small>Looping news array with set read dynamic route</small>
        <div className={styles.grid}>
          {news.map((item, index) => (
          <div key={index}>
            <Link 
              href={{pathname:'/news/read', query:{'title':item.title, 'content':item.content, 'categori':item.categori}}}
              as={`/news/${item.title}`}
            >
              <a className={styles.card}>
                <center><Image 
                  src={item.image}
                  quality={100}
                  width={100}
                  height={80}
                  loading="lazy"
                  
                /></center>
                <h2>{item.title} &rarr;</h2>
                <p>Category {item.categori}</p>
              </a>
            </Link>
            </div>
          ))}
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
    </div>
  )
}
