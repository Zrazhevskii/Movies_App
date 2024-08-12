// import React from 'react'
import Movie from '../Movie/Movie';
import './MoviesList.css';

export default function MoviesList({ data }) {
    // console.log(data)
    // data.map(item => {
    //     console.log(item.id);
    // })
    return (
        <ul className='movies__list'>
            {data.map((item) => {
                return <Movie item={item} key={item.id}/>;
            })}
        </ul>
    );
}
