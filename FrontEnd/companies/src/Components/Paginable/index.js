import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginable = ({ page, totalPages, previousPage, nextPage }) => {
  return (
    <Pagination className='justify-content-center'>
      {page !== 1 && <Pagination.Prev onClick={previousPage} />}
      {totalPages !== page && <Pagination.Next onClick={nextPage} />}
    </Pagination>
  );
};

export default Paginable;
