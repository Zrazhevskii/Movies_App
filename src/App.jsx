// import { useState } from 'react'
import './App.css';
import { useState } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { Api, ApiNextPage, getGenresMovies } from './Api';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';

function App() {
   const [movies, setMovies] = useState([]);
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);

   const handleChangeValue = (evt) => {
      evt.preventDefault();
      setValueSearch(evt.target.value);
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();
      if (valueSearch.trim() !== '') {
         Api(valueSearch).then((data) => {
            setTotalResults(data.total_results);
            setMovies(data.results);
            // setValueSearch('');
         });
      }
      if (genresList.length === 0) {
         getGenresMovies().then((data) => {
            setGenresList(data);
         });
      }
   };

   // apiGetImage('/o2utunIiqXZRfAe70xLtx68xqCb.jpg');

   const handleNextPage = (evt) => {
      ApiNextPage(valueSearch, evt).then((data) => {
         setMovies(data.results);
      });
   };

   // console.log(genresList);

   return (
      <Layout className="layout__wrapper">
         <MoviesHeader handleChangeValue={handleChangeValue} valueSearch={valueSearch} handleSubmit={handleSubmit} />
         <Content>
            <MoviesList data={movies} genresList={genresList} />
         </Content>
         <MoviesFooter totalResults={totalResults} handleNextPage={handleNextPage} />
      </Layout>
   );
}

export default App;
