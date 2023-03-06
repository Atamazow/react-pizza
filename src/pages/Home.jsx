import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

function Home(props) {
  const [items, setItems] = useState();
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярные",
    sortProperty: "rating",
  });

  useEffect(() => {
      const order = sortType.sortProperty.includes('-') ? 'asc' :  'desc';
      const sortBy  = sortType.sortProperty.replace('-', '');
      const category  = categoryId > 0 ? `category=${categoryId}` : '';
    fetch(`https://6368ce8715219b84960742ec.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [categoryId, sortType]);
console.log(categoryId)
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
      <div className="content__items">
        {items?.map((obj) => (
          <PizzaBlock key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
}

export default Home;
