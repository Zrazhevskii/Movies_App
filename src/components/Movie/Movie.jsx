// import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { Button, Card, Image, Flex, Spin } from 'antd';
import { format } from 'date-fns';
import Context from '../Context';
import './Movie.css';

export default function Movie({ item }) {
   const { title, poster_path, overview, genre_ids, release_date: releaseDate, vote_average } = item;

   const image =
      poster_path === null ? '../../../src/image/noposter.jpg' : `https://image.tmdb.org/t/p/w200${poster_path}`;

   const [loader, setLoader] = useState(true);
   const value = useContext(Context);
   const { genresList } = value;

   useEffect(() => {
      setLoader((prev) => !prev);
   }, [item]);

   const rating = vote_average.toFixed(1);
   const date = releaseDate ? format(releaseDate, 'MMMM dd, yyyy') : 'Дата неуказана';
   const intersections = genresList.filter((elem) => genre_ids.includes(elem.id));

   const changeString = () => {
      const str = overview.split(' ');
      if (str.length > 30) {
         return `${str.slice(0, 25).join(' ')}...`;
      }
      if (str.length < 1) {
         console.log('я здесь');
         return 'Описание отсутствует';
      }
      return overview;
   };

   return (
      <li className="movies__list_item">
         {loader ? (
            <Spin size="large" className="spin__image" />
         ) : (
            <>
               <Image width={180} height={243} className="movies__list_image" src={image} />
               <Card className="movies__list_card">
                  <div className="movies__list_box">
                     <div className="movies__list_title">{title}</div>
                     <div className="movies__list_rating">{rating}</div>
                  </div>
                  <div className="movies__list_release">{date}</div>
                  <Flex gap="small" wrap>
                     {intersections.map((el) => {
                        return <Button key={el.id}>{el.name}</Button>;
                     })}
                  </Flex>
                  <div className="movies__list_description">{changeString()}</div>
               </Card>
            </>
         )}
      </li>
   );
}

Movie.propTypes = {
   item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
   }),
   // genresList: PropTypes.arrayOf(
   //    // PropTypes.objectOf(
   //    PropTypes.shape({
   //       id: PropTypes.number,
   //       name: PropTypes.string,
   //    }),
   //    // ),
   // ),
};
