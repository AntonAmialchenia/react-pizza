import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { usePizzas } from '../hooks/Pizzas';

import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

import Pagination from '../components/Pagination';

const Home: FC = () => {
  const dispatch = useDispatch();

  const { items, error, isLoading, categoryId } = usePizzas();

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
      <div className="content__items">
        {isLoading ? sceletons : pizzas}
        {error && <p>{error}</p>}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
