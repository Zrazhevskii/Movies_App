// import React from 'react'
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button, Card, Image, Flex } from 'antd';
import './Movie.css';
// import '../../../src/image/noposter.jpg';

export default function Movie({ item, genresList }) {
    const {
        title,
        poster_path,
        overview,
        genre_ids,
        release_date,
        vote_average,
    } = item;

    const rating = vote_average.toFixed(1)
    const date = format(release_date, 'MMMM dd, yyyy')
    // console.log(date)

    const intersections = genresList.filter((elem) =>
        genre_ids.includes(elem.id)
    );

    const changeString = () => {
        const str = overview.split(' ');
        if (str.length > 40) {
            return str.slice(0, 30).join(' ') + '...';
        } else if (str.length < 1) {
            console.log('я здесь');
            return 'Описание отсутствует';
        }
        return overview;
    };

    // changeString();

    let image =
        poster_path === null
            ? '../../../src/image/noposter.jpg'
            : `https://image.tmdb.org/t/p/w200${poster_path}`;

    // let content = 

    return (
        <li className='movies__list_item'>
            <Image
                width={180}
                height={243}
                className='movies__list_image'
                src={image}
            />
            <Card className='movies__list_card'>
                <div className='movies__list_box'>
                    <span className='movies__list_title'>{title}</span>
                    <div className='movies__list_rating'>{rating}</div>
                </div>
                <Flex gap="small" wrap>
                    {intersections.map((el) => {
                        return <Button key={el.id}>{el.name}</Button>;
                    })}
                </Flex>
                <div className="movies__list_release">{date}</div>
                {/* <div className='box__button'> */}
                    
                {/* </div> */}
                <div className="movies__list_description">
                    {changeString()}
                </div>
            </Card>
        </li>
    );
}

Movie.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        overview: PropTypes.string.isRequired,
        genre_ids: PropTypes.array,
        release_date: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
    }),
    genresList: PropTypes.array,
};
