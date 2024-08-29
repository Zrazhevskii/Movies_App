// import React from 'react'
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';
import Movie from '../Movie/Movie';
import './MoviesList.css';

export default function MoviesList({ data, error, noresult, loader, guestSessionId, errorInfo, noresultInfo }) {
   if (noresult) {
      return <Alert message="Informational Notes" description={noresultInfo} type="info" showIcon />;
   }

   if (error) {
      return <Alert message="Error" description={errorInfo} type="error" showIcon />;
   }

   if (loader) {
      return <Spin size="large" className="spin__image" />;
   }

   return (
      <ul className="movies__list">
         {data &&
            data.map((item) => {
               return <Movie item={item} key={item.id} guestSessionId={guestSessionId} />;
            })}
      </ul>
   );
}

MoviesList.propTypes = {
   data: PropTypes.instanceOf(Array),
   error: PropTypes.bool.isRequired,
   noresult: PropTypes.bool.isRequired,
   loader: PropTypes.bool.isRequired,
   guestSessionId: PropTypes.string.isRequired,
   errorInfo: PropTypes.string.isRequired,
   noresultInfo: PropTypes.string.isRequired,
};
