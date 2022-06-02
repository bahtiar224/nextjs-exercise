import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const DynamicComponent = dynamic(() =>
  import('../../components/hello').then((mod) => mod.Hello)
)

export default function About() {
  return (
    <div className={styles.container}>
    <Head>
        <title>Dynamic Import</title>
        <link rel="icon" href="/fish.jpg"/>
    </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Dynamic Import Page
        </h1>
        
      </main>
    </div>
  )
}
