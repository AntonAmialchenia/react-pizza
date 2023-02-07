import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pizza } from '../models';
import Pagination from '../components/Pagination';

interface HomeProps {
  searchValue: string;
}

const Home = ({ searchValue }: HomeProps) => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [error, setError] = useState('');

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';

  async function fetchPizzas() {
    try {
      setError('');
      setIsLoading(true);
      const response = await axios.get(
        `https://63db90c6c45e08a043484e95.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      console.log();

      setItems(response.data);
      setIsLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      setIsLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const sceletons = [...new Array(6)].map((item, index) => <Sceleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  // const pizzas = items.filter(item => {
  //   if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true
  //   }
  //   return false
  // })
  // .map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(sortType) => setSortType(sortType)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination onChangePage = {(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
