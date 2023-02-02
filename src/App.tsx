import React, { useState, useEffect } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import axios from 'axios';

import './scss/app.scss';

export interface Pizza {
  id?: number  
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating?: number;
}

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  async function fetchPizzas() {
    const response = await axios.get('https://63db90c6c45e08a043484e95.mockapi.io/pizzas');
    setPizzas(response.data);
  }

  useEffect(() => {
    fetchPizzas();
  });

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
