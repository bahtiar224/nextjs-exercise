import Head from 'next/head';
import styles from '@styles/Home.module.css';
import dynamic from 'next/dynamic';

export default function Csr(props) {
    const seafood = props.meals;
    const Detail = dynamic(() => import('@components/detail'))

    return (
        <div className={styles.container}>
        <Head>
            <title>Detail EXAMPLE</title>
            <link rel="icon" href="/fish.jpg"/>
        </Head>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Detail Page
            </h1>
            <Detail meals={seafood}/>
        </main>
        </div>
    )
}
  
export async function getStaticPaths() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
    const data = await res.json();
    const paths = data.meals.map((item) => {
        return {
        params: { id: item.idMeal },
        };
    });
    return {
        paths,
        fallback: false, // false or 'blocking'
    };
}
  
// This also gets called at build time
export async function getStaticProps({ params }) {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+params.id);
    const result = await data.json();
    const meals = result.meals[0];
    return {
        props: {
            meals
        }
    }
}
  