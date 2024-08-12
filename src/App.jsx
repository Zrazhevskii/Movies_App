// import { useState } from 'react'
import './App.css';
import { useState } from 'react';
// import { Button } from 'antd';
import { Layout } from 'antd';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import './App.css';
import { data } from '../Api';
import { Content } from 'antd/es/layout/layout';
import MoviesList from './components/MoviesList/MoviesList';

function App() {
    // const [count, setCount] = useState(0)
    // const apiUrl = 'https://api.themoviedb.org/3'
    // const apiKey = 'fe1e2a68fe8bdd299a2072adcc00e09a';
    // Api('terminator');

    const [movies, setMovies] = useState([]);
    const [valueSearch, setValueSearch] = useState('');

    const handleChangeValue = (evt) => {
        setValueSearch(evt.target.value);
    };

    return (
        <Layout className='layout__wrapper'>
            <MoviesHeader handleChangeValue={handleChangeValue} valueSearch={valueSearch}/>
            <Content>
                <MoviesList data={data} />
            </Content>
        </Layout>
    );
}

export default App;
