import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

function Pagination({setCurrentPage}) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
