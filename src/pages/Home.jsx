import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

function Home(props) {
    const [items, setItems] = useState()
    useEffect(() => {
        fetch('https://6368ce8715219b84960742ec.mockapi.io/items')
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
    }, [])

    return (
        <div>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {items?.map((obj) => (
                    <PizzaBlock key={obj.id} {...obj}/>
                ))}
            </div>
        </div>
    );
}

export default Home;