// import { useState } from 'react'
import './App.css';
import { useState, useMemo } from 'react';
import { Alert, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Context from './components/Context';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { apiGetMovies, ApiNextPage, getGenresMovies, getGuestSession, getRatingMovies } from './Api';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';
import NoConnectNetwork from './components/NoConnectNetwork/NoConnectNetwork';

function App() {
   const [movies, setMovies] = useState({
      allMovies: [],
      ratesMovies: [],
      changeMovies: false,
      guestSessionId: '8919dfd984a9003639702dde43d4286a',
   });
   const { allMovies, ratesMovies, changeMovies, guestSessionId } = movies;
   // console.log(guestSessionId);
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);
   const [servises, setServises] = useState({
      error: false,
      noresult: false,
      loader: false,
   });

   // getGuestSession();
   // 'e54bf2f8e53514e0d3bab1ab82ce08ba' id гостевой сессии

   const { error, noresult, loader } = servises;

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
         setServises((prev) => ({ ...prev, loader: !prev.loader }));
         apiGetMovies(valueSearch)
            .then((data) => {
               if (!data.results.length) {
                  changeNoresult();
               } else {
                  setTotalResults(data.total_results);
                  setMovies((prev) => ({ ...prev, allMovies: data.results }));
                  setServises((prev) => ({ ...prev, loader: !prev.loader }));
               }
            })
            .catch((err) => {
               console.log(err);
               setServises((prev) => ({ ...prev, error: !prev.error }));
            });

         if (!guestSessionId.length) {
            getGuestSession().then((data) => {
               console.log(data);
               setMovies((prev) => ({ ...prev, guestSessionId: data }));
            });
         }
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

   // const addRatesMovies = (id) => {
   //    if (changeMovies) return;
   //    const rateMovie = allMovies.filter((item) => item.id === id);
   //    setMovies((prev) => ({ ...prev, ratesMovies: [...ratesMovies, ...rateMovie] }));
   // };

   const changeAllRatesMovies = () => {
      getRatingMovies(1, guestSessionId).then((data) => {
         setMovies((prev) => ({ ...prev, ratesMovies: data.results }));
      });
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
                     loader={loader}
                     guestSessionId={movies.guestSessionId}
                  />
               </Content>
            )}
            <MoviesFooter totalResults={countMovies} handleNextPage={handleNextPage} />
         </Layout>
      </Context.Provider>
   );
}

export default App;
