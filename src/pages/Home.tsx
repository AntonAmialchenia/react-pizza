import React, { FC, useEffect, useState , useRef} from 'react';
import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { setCategoryId, setFilters, sort } from '../redux/slices/filterSlice';
import { Pizza } from '../models';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

import Pagination from '../components/Pagination';
import { itemsPopup } from './../components/Sort';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false)
  const isMouted = useRef(false)

  // const { items, error, isLoading, categoryId } = usePizzas();

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );

  const [items, setItems] = useState<Pizza[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  

  async function fetchPizzas() {

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort?.sortProperty.replace('-', '');
    const order = sort?.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      setError('');
      setIsLoading(true);
      const response = await axios.get(
        `https://63db90c6c45e08a043484e95.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      setItems(response.data);
      setIsLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setIsLoading(false);
      setError(error.message);
    }
  }
// Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMouted.current) {
      const queryString = qs.stringify({
      sortProperty: sort?.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
    }
    isMouted.current = true
  }, [categoryId, sort?.sortProperty, currentPage]);

  // Если был первый рендерб то проверяем URL параметры и сохраняем в редаксе

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = itemsPopup.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          sort,
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
        }),
      );
      isSearch.current = true
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false
  }, [categoryId, sort?.sortProperty, searchValue, currentPage]);

  

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
