import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pizza } from '../models';

const Home = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPizzas() {
    try {
      setError('');
      setIsLoading(true);
      const response = await axios.get('https://63db90c6c45e08a043484e95.mockapi.io/pizzas');
      setPizzas(response.data);
      setIsLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      setIsLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchPizzas();
    window.scrollTo(0,0)
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading && [...new Array(6)].map((item, index) => <Sceleton key={index} />)}
        {pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;
