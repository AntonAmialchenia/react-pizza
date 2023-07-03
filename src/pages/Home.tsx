import { FC, useEffect, useRef, useCallback } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";

import { setCategoryId, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Sceleton from "../components/PizzaBlock/Sceleton";

import Pagination from "../components/Pagination";
import { itemsPopup } from "./../components/Sort";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMouted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useAppSelector(
    (state) => state.filter,
  );
  const { items, status } = useAppSelector((state) => state.pizza);

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
    isMouted.current = true;
  }, [categoryId, sort?.sortProperty, currentPage, navigate]);

  // Если был первый рендерб то проверяем URL параметры и сохраняем в редаксе

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = itemsPopup.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(
        setFilters({
          sort,
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы

  useEffect(() => {
    window.scrollTo(0, 0);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort?.sortProperty.replace("-", "");
    const order = sort?.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    if (!isSearch.current) {
      dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }));
    }
    isSearch.current = false;
  }, [categoryId, sort?.sortProperty, searchValue, currentPage, dispatch]);

  const onChangeCategory = useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    [dispatch],
  );

  const sceletons = [...new Array(4)].map((item, index) => (
    <Sceleton key={index} />
  ));
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort!} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получть пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? sceletons : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
