import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

function Home() {
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     console.log(params);
  //     const sort = list.find((obj) => obj.sortProperty === params.sortType);
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       })
  //     );
  //   }
  // }, []);

  const getPizzas = () => {
    const order = sortType?.includes("-") ? "asc" : "desc";
    const sortBy = sortType?.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
  };

  useEffect(() => {
    getPizzas();

    const queryString = qs.stringify({
      sortType,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}queryString`);
  }, [categoryId, sortType, currentPage, searchValue]);

  const pizzas = items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h1>Произошла ошибка 😢</h1>
          <p>К сожалению, не удалось найти питсы. Повторите попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
