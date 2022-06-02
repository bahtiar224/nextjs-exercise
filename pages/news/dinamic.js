import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import custom from '../../styles/custom.module.css';
import { useState, useEffect } from 'react'

export default function DinamicNews() {
  const [news, setNews] = useState([]);

  const [titles, setTitles] = useState('');
  const [content, setContent] = useState('');
  const [categori, setCategori] = useState('');
  const [banner, setBanner] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // fetch api
  const fetchData = async () => {
      const data = await fetch("/api/news");
      const result = await data.json();
      console.log(result);
      setNews(result);
  }

  const submitNews = async () => {
    const response = await fetch("/api/news", {
      method: "POST",
      body: JSON.stringify({
        titles, content, categori, banner, thumbnail
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setNews(data);
    console.log(data);
  };

  useEffect(() => {
      fetchData();
    },[]
  )
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={custom.input_form}>
            <h3>Form Input News</h3>
            <label >Title:</label><br/>
            <input type="text" placeholder='Title' onChange={(e) => setTitles(e.target.value)} /><br/>
            <label >Category:</label><br/>
            <select name="categori" id="categori" onChange={(e) => setCategori(e.target.value)}>
              <option value="Hot news">Hot news</option>
              <option value="Trending News">Trending News</option>
              <option value="Headline News">Headline News</option>
            </select><br/>
            <label >Content:</label><br/>
            <textarea id="content" name="content" rows="4" cols="50" onChange={(e) => setContent(e.target.value)}></textarea><br/>
            <label >Image:</label><br/>
            <input type="text" onChange={(e) => setBanner(e.target.value)} placeholder='Banner url'/><br/>
            <input type="text" onChange={(e) => setThumbnail(e.target.value)} placeholder='Thumbnai path'/>
            <br/>
            <button onClick={submitNews}>Save</button>
        </div>
        <hr/>
        <div className={styles.grid}>
          {
              news && news.length > 0 ? (
                news.map((item, index) => (
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
                ))
              ):(
                <p>Loading . . .</p>
              )
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
