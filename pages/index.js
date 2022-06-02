import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ postData }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          NEXT JS TRAINING
        </h1>
        <div className={styles.grid}>
            <Link 
              href="/fetching"
            >
              <a className={styles.card}>
                <h2>Fetching &rarr;</h2>
                <p>Example fetching page</p>
              </a>
            </Link>
            <Link 
              href="/about"
            >
              <a className={styles.card}>
                <h2>About &rarr;</h2>
                <p>Example about page</p>
              </a>
            </Link>
            <Link 
              href="/news"
            >
              <a className={styles.card}>
                <h2>News &rarr;</h2>
                <p>Example news page</p>
              </a>
            </Link>
            <Link 
              href="/news/dinamic"
            >
              <a className={styles.card}>
                <h2>News From API &rarr;</h2>
                <p>Example news page</p>
              </a>
            </Link>
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
