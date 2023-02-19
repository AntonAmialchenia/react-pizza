import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';

import { Pizza } from '../models';

function usePizzas() {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );

  const [items, setItems] = useState<Pizza[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sort?.sortProperty.replace('-', '');
  const order = sort?.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';

  async function fetchPizzas() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPizzas();
  }, [categoryId, sort?.sortProperty, searchValue, currentPage]);

  return { items, error, isLoading, categoryId };
}
