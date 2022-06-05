import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import {useQuery } from '@apollo/client';
import Link from 'next/link';
import {GET_CATEGORIES} from '@/schema';

export default function Category() {

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(data);

  return (
    <div className={styles.container}>
    <Head>
        <title>Apollo</title>
        <link rel="icon" href="/fish.jpg"/>
    </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Apollo Graphql Page
        </h1>
        <div className={styles.grid}>
          {
                data.categories.items.map((item, index) => (
                  <Link 
                    href={{ pathname:`/categories/${item.id}`}}
                    key={index}
                  >
                    <a className={styles.card}>
                      <h2>{item.name} &rarr;</h2>
                      <p>Category {item.id}</p>
                    </a>
                  </Link>
                ))
          }
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
