// import React from 'react'
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Button, Card, Image, Flex, Rate } from 'antd';
import { format } from 'date-fns';
import Context from '../Context';
import './Movie.css';
import ChangeText from '../ChangeText';
import { addRating } from '../../Api';

export default function Movie({ item, guestSessionId }) {
   const { id, title, poster_path, overview, genre_ids, release_date: releaseDate, vote_average } = item;
   const image =
      poster_path === null ? '../../../src/image/noposter.jpg' : `https://image.tmdb.org/t/p/w200${poster_path}`;

   const [rate, setRate] = useState(item.rating);
   const value = useContext(Context);
   const { genresList } = value;
   const rating = vote_average.toFixed(1);
   const date = releaseDate ? format(releaseDate, 'MMMM dd, yyyy') : 'Дата неуказана';
   const intersections = genresList && genresList.filter((elem) => genre_ids.includes(elem.id));

   let color = '';
   if (rating <= 3) color = 'movies__list_rating red';
   if (rating > 3 && rating <= 5) color = 'movies__list_rating orange';
   if (rating > 5 && rating <= 7) color = 'movies__list_rating yellow';
   if (rating > 7) color = 'movies__list_rating green';

   const changeCountStar = (evt) => {
      setRate(evt);
      if (evt > 0) {
         addRating(id, guestSessionId, evt);
      }
   };

   return (
      <li className="movies__list_item">
         <Image
            bodyStyle={{
               width: 180,
               overflow: 'auto',
            }}
            height={270}
            maskClassName="movies__list_image"
            src={image}
         />
         <Card className="movies__list_card">
            <div className="movies__list_box">
               <div className="movies__list_title">{ChangeText(title, 'title')}</div>
               <div className={color}>{rating}</div>
            </div>
            <div className="movies__list_release">{date}</div>
            <Flex gap="small" wrap>
               {intersections.map((el) => {
                  return <Button key={el.id}>{el.name}</Button>;
               })}
            </Flex>
            <div className="movies__list_description">{ChangeText(overview, 'overview', intersections.length)}</div>
            <Rate
               className="movies__list_rate"
               count={10}
               value={rate}
               allowHalf
               onChange={(evt) => changeCountStar(evt)}
            />
         </Card>
      </li>
   );
}

Movie.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      rating: PropTypes.number,
   }),
   guestSessionId: PropTypes.string.isRequired,
};
