// import React from 'react'
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'antd';
import './Movie.css';

export default function Movie({ item }) {
    // console.log(item);
    const { title, poster_path, overview } = item;

    const changeString = () => {
        const str = overview.split(' ');
        if (str.length > 40) {
            return str.slice(0, 30).join(' ')
        }
        return overview;
    };

    changeString();

    return (
        <li className='movies__list_item'>
            <Image
                width={180}
                height={243}
                className='movies__list_image'
                src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            />
            <Card title={title} className='movies__list_card'>
                <div className='box__button'>
                    <Button>Action</Button>
                    <Button>Drama</Button>
                </div>
                {changeString()}...
            </Card>
        </li>
    );
}

Movie.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        overview: PropTypes.string.isRequired,
    }),
}
