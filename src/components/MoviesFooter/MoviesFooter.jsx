// import React from 'react'
import PropTypes from 'prop-types';
import './MoviesFooter.css';
import { Layout, Pagination } from 'antd';

const { Footer } = Layout;

export default function MoviesFooter({ totalResults, handleNextPage }) {
   return (
      <Footer className="footer">
         <Pagination
            showSizeChanger={false}
            defaultCurrent={1}
            total={totalResults}
            onChange={(evt) => handleNextPage(evt)}
            pageSize={20}
            hideOnSinglePage
            responsive
         />
      </Footer>
   );
}

MoviesFooter.propTypes = {
   totalResults: PropTypes.number,
   handleNextPage: PropTypes.func.isRequired,
};
