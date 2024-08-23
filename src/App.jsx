// import { useState } from 'react'
import './App.css';
import { useState, useMemo } from 'react';
import { Alert, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Context from './components/Context';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { apiGetMovies, ApiNextPage, getGenresMovies } from './Api';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';
import NoConnectNetwork from './components/NoConnectNetwork/NoConnectNetwork';

function App() {
   const [movies, setMovies] = useState({
      allMovies: [],
      ratesMovies: [],
      changeMovies: false,
   });
   const { allMovies, ratesMovies, changeMovies } = movies;
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);
   const [servises, setServises] = useState({
      error: false,
      noresult: false,
   });

   const { error, noresult } = servises;

   const changeNoresult = () => {
      setServises((prev) => ({ ...prev, noresult: !prev.noresult }));
   };

   const handleChangeValue = (evt) => {
      if (noresult) {
         setServises((prev) => ({ ...prev, noresult: !prev.noresult }));
      }
      evt.preventDefault();
      setValueSearch(evt.target.value);
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();
      if (valueSearch.trim() !== '') {
         apiGetMovies(valueSearch)
            .then((data) => {
               if (!data.results.length) {
                  changeNoresult();
               } else {
                  setTotalResults(data.total_results);
                  setMovies((prev) => ({ ...prev, allMovies: data.results }));
               }
            })
            .catch((err) => {
               console.log(err);
               setServises((prev) => ({ ...prev, error: !prev.error }));
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
         setMovies((prev) => ({ ...prev, allMovies: data.results }));
      });
   };

   const addRatesMovies = (id) => {
      if (changeMovies) return;
      const rateMovie = allMovies.filter((item) => item.id === id);
      setMovies((prev) => ({ ...prev, ratesMovies: [...ratesMovies, ...rateMovie] }));
   };

   const changeAllRatesMovies = () => {
      setMovies((prev) => ({ ...prev, changeMovies: !prev.changeMovies }));
   };

   const countMovies = changeMovies ? ratesMovies.length : totalResults;
   const currentMoviesList = changeMovies ? ratesMovies : allMovies;
   const value = useMemo(() => ({ genresList }), [genresList]);

   return (
      <Context.Provider value={value}>
         <Layout className="layout__wrapper">
            <MoviesHeader
               handleChangeValue={handleChangeValue}
               valueSearch={valueSearch}
               handleSubmit={handleSubmit}
               changeAllRatesMovies={changeAllRatesMovies}
               changeMovies={changeMovies}
            />
            {!NoConnectNetwork() ? (
               <Alert
                  message="Error"
                  description="Ой, беда пришла к вам в дом... интернет отключили"
                  type="error"
                  showIcon
               />
            ) : (
               <Content>
                  <MoviesList
                     data={currentMoviesList}
                     error={error}
                     noresult={noresult}
                     addRatesMovies={addRatesMovies}
                  />
               </Content>
            )}
            <MoviesFooter totalResults={countMovies} handleNextPage={handleNextPage} />
         </Layout>
      </Context.Provider>
   );
}

export default App;
