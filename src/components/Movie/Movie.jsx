// import React from 'react'
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Button, Card, Image, Flex, Rate } from 'antd';
import { format } from 'date-fns';
import Context from '../../utils/Context';
import './Movie.css';
// import '../../../src/assets/noposter.jpg'
import ChangeText from '../../utils/ChangeText';
import { addRating } from '../../servises/Api';

export default function Movie({ item, guestSessionId }) {
   const {
      id,
      title,
      poster_path: posterPath,
      overview,
      genre_ids: genreIds,
      release_date: releaseDate,
      vote_average: voteAverage,
   } = item;
   const noPoster = '../../../src/assets/noposter.jpg';
   const baseImageUrl = 'https://image.tmdb.org/t/p/w200/';
   const posterImage = new URL(`/t/p/w200/${posterPath}`, baseImageUrl);
   // console.log(posterImage.href);
   const image = posterPath === null ? noPoster : posterImage.href;
   // console.log(posterPath);

   const [rate, setRate] = useState(item.rating);
   const value = useContext(Context);
   const { genresList } = value;
   const rating = voteAverage.toFixed(1);
   const date = releaseDate ? format(releaseDate, 'MMMM dd, yyyy') : 'Дата неуказана';
   const intersections = genresList && genresList.filter((elem) => genreIds.includes(elem.id));

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
         <Image height={270} className="movies__list_image" src={image} />
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
