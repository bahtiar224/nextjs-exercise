import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Fetching() {
  return (
    <div className={styles.container}>
    <Head>
        <title>Fetching</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Fetching Page
        </h1>
        <div className={styles.grid}>
            <Link 
              href="/fetching/csr"
            >
              <a className={styles.card}>
                <h2>CSR &rarr;</h2>
                <p>Example csr fetching</p>
              </a>
            </Link>
            <Link 
              href="/fetching/ssr"
            >
              <a className={styles.card}>
                <h2>SSR &rarr;</h2>
                <p>Example ssr fetching</p>
              </a>
            </Link>
            <Link 
              href="/fetching/ssg"
            >
              <a className={styles.card}>
                <h2>SSG &rarr;</h2>
                <p>Example ssg fetching</p>
              </a>
            </Link>
            <Link 
              href={{pathname:"/fetching/isr"}}
            >
              <a className={styles.card}>
                <h2>ISR &rarr;</h2>
                <p>Example isr fetching</p>
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
