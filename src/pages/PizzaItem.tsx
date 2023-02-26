import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Pizza } from '../models';

const PizzaItem = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = React.useState<Pizza>()

    React.useEffect(() => {
        async function feachPizza() {
            try {
                const {data} = await axios.get<Pizza>('https://63db90c6c45e08a043484e95.mockapi.io/pizzas/' + id)
                setPizza(data)
            } catch (error) {
               alert('Ошибка при получении пиццы!') 
               navigate('/')
            }            
        }
        feachPizza()
    },[])
    
    return (
        <div className='container'>
            <div className='pizza'>
                <img className='pizza__img' src={pizza?.imageUrl} alt={pizza?.title}/>
                <h2 className='pizza__title'>{pizza?.title}</h2>
                <p className='pizza__rating'>{pizza?.rating}</p>
                <p className='pizza__price'>{pizza?.price} ₽</p>
            </div>
        </div>
    );
};

export default PizzaItem;