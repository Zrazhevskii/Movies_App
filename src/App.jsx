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
   const [movies, setMovies] = useState([]);
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);
   const [servises, setServises] = useState({
      error: false,
      noresult: false,
   });

   const { error, noresult } = servises;

   // const [noresult, setNoresult] = useState(false);

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
                  setMovies(data.results);
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
         setMovies(data.results);
      });
   };

   const value = useMemo(() => ({ genresList }), [genresList]);

   return (
      <Context.Provider value={value}>
         <Layout className="layout__wrapper">
            <MoviesHeader handleChangeValue={handleChangeValue} valueSearch={valueSearch} handleSubmit={handleSubmit} />
            {!NoConnectNetwork() ? (
               <Alert
                  message="Error"
                  description="Ой, беда пришла к вам в дом... интернет отключили"
                  type="error"
                  showIcon
               />
            ) : (
               <Content>
                  <MoviesList data={movies} error={error} noresult={noresult} />
               </Content>
            )}
            <MoviesFooter totalResults={totalResults} handleNextPage={handleNextPage} />
         </Layout>
      </Context.Provider>
   );
}

export default App;
