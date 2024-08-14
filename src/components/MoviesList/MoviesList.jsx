// import React from 'react'
import PropTypes from 'prop-types';

import Movie from '../Movie/Movie';
import './MoviesList.css';

export default function MoviesList({ data, genresList }) {
   return (
      <ul className="movies__list">
         {data.map((item) => {
            return <Movie item={item} key={item.id} genresList={genresList} />;
         })}
      </ul>
   );
}

MoviesList.propTypes = {
   data: PropTypes.instanceOf(Array),
   genresList: PropTypes.arrayOf(
      PropTypes.objectOf(
         PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
         }),
      ),
   ),
};
