import React, { useState, useEffect, useContext, FC } from 'react';
import axios, { AxiosError } from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pizza } from '../models';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

interface HomeContext {
  searchValue: string;
}

const Home: FC = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state: RootState) => state.filter);

  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const { searchValue } = useContext<HomeContext>(SearchContext);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';

  async function fetchPizzas() {
    try {
      setError('');
      setIsLoading(true);
      const response = await axios.get(
        `https://63db90c6c45e08a043484e95.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
        <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
