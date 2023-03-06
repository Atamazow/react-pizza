import React from 'react';
import style from './NotFuound.module.scss'

function Index(props) {
    return (
        <div className={style.root}>
           <span>😢😢😢</span>
            <br/>
            <h1>Ничего не найдено </h1>
            <p className={style.desription}>К сожалению данныя страница отсутвует на вашем сайте</p>
        </div>
    );
}

export default Index;