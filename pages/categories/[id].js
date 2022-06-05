import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import {news} from '../../example.js';
import React, {useEffect, useState} from 'react';
import custom from '../../styles/custom.module.css';
import {GET_PRODUCT_BY_CATEGORY} from '@/schema';
import { useLazyQuery  } from '@apollo/client';


export default function Read() {
 const router = useRouter();
 const {id} = router.query;
 
 const [getDetail, { loading, error, data }] = useLazyQuery(GET_PRODUCT_BY_CATEGORY, {
     variables: {
        categoryId: id,
     }
 })

 console.log(data);

 if (loading) return null;
 if (error) return `Error! ${error}`;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
           Detail Categories (Lazy Load)
           <hr/>
           <button onClick={() => getDetail()}>Clik for load</button>
        </h1>
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
