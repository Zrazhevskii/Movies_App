// import React from 'react'
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';
import Movie from '../Movie/Movie';
import './MoviesList.css';

export default function MoviesList({ data, error, noresult, loader, guestSessionId }) {
   if (noresult) {
      return (
         <Alert
            message="Informational Notes"
            description="Вы не подумайте, мы не придираемся, но вы ищете что-то необычное, мы ничего не нашли((("
            type="info"
            showIcon
         />
      );
   }

   if (error) {
      return (
         <Alert
            message="Error"
            description="Упс, внешний мир не отвечает, перегрузите страницу"
            type="error"
            showIcon
         />
      );
   }

   if (loader) {
      return <Spin size="large" className="spin__image" tip="Loading" />;
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
};
