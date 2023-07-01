import React from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const Pagination = ({ handlePrevPage, handleNextPage, offset, limit, total }) => (
  <div className="pagination">
    <Button variant="light" onClick={handlePrevPage} disabled={offset === 0}>
      <BsArrowLeft />
      Prev
    </Button>
    <Button variant="light" onClick={handleNextPage} disabled={offset + limit >= total}>
      Next
      <BsArrowRight />
    </Button>
  </div>
);

export default Pagination;
