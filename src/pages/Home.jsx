import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

function Home({ searchValue }) {
  const [items, setItems] = useState();
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: "популярные",
    sortProperty: "rating",
  });

  useEffect(() => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6368ce8715219b84960742ec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [categoryId, sortType, searchValue,currentPage]);
  const pizzas = items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzas}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
