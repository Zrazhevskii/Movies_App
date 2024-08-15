// import { useState } from 'react'
import './App.css';
import { useState, useMemo } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Context from './components/Context';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { apiGetMovies, ApiNextPage, getGenresMovies } from './Api';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';

function App() {
   const [movies, setMovies] = useState([]);
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);
   const [error, setError] = useState(false);

   const handleChangeValue = (evt) => {
      evt.preventDefault();
      setValueSearch(evt.target.value);
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();
      if (valueSearch.trim() !== '') {
         apiGetMovies(valueSearch)
            .then((data) => {
               setTotalResults(data.total_results);
               setMovies(data.results);
            })
            .catch((err) => {
               console.log(err);
               setError((prev) => !prev);
            });
      }
      if (!genresList.length) {
         getGenresMovies().then((data) => {
            setGenresList(data);
         });
      }
   };

   const handleNextPage = (evt) => {
      ApiNextPage(valueSearch, evt).then((data) => {
         setMovies(data.results);
      });
   };

   const value = useMemo(() => ({ genresList }), [genresList]);

   return (
      <Context.Provider value={value}>
         <Layout className="layout__wrapper">
            <MoviesHeader handleChangeValue={handleChangeValue} valueSearch={valueSearch} handleSubmit={handleSubmit} />
            <Content>
               <MoviesList data={movies} error={error} />
            </Content>
            <MoviesFooter totalResults={totalResults} handleNextPage={handleNextPage} />
         </Layout>
      </Context.Provider>
   );
}

export default App;
