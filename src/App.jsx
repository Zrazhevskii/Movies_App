// import { useState } from 'react'
import './App.css';
import { useState } from 'react';
// import { Button } from 'antd';
import { Layout } from 'antd';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { Api, ApiNextPage } from '../Api';
import { Content } from 'antd/es/layout/layout';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';

function App() {
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState();
    const [valueSearch, setValueSearch] = useState('');
    const handleChangeValue = (evt) => {
        evt.preventDefault();
        setValueSearch(evt.target.value);
    };

    const handleSubmit = (evt) => {
        if (evt.key === 'Enter' && evt.target.value.trim() !== '') {
            Api(valueSearch).then((data) => {
                setTotalResults(data.total_results);
                setMovies(data.results);
            });
        }
    };

    const handleNextPage = (evt) => {
        // console.log(evt);
        ApiNextPage(valueSearch, evt).then((data) => {
            setMovies(data.results);
        });
    };

    return (
        <Layout className='layout__wrapper'>
            <MoviesHeader
                handleChangeValue={handleChangeValue}
                valueSearch={valueSearch}
                handleSubmit={handleSubmit}
            />
            <Content>
                <MoviesList data={movies} />
            </Content>
            <MoviesFooter totalResults={totalResults} handleNextPage={handleNextPage} />
        </Layout>
    );
}

export default App;
