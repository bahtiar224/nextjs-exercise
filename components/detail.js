import Image from 'next/image'
import custom from '../styles/custom.module.css';

export default function Detail(props) {
    const seafood = props.meals;

    return (
        <div className={custom.news_card}>
            <h3>{seafood.strMeal}</h3>
            <p className={custom.categories}>Category : {seafood.strCategory}</p>
            <p>{seafood.strInstructions}</p>
            <Image 
                src={seafood.strMealThumb}
                quality={100}
                width={450}
                height={300}
                loading="lazy"
            />
            
        </div>
    )
}
  
  