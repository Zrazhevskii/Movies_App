import './App.css';
import { useState, useMemo, useCallback } from 'react';
import { Alert, Layout } from 'antd';
import debounce from 'lodash.debounce';
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
      guestSessionId: '',
   });
   const { allMovies, ratesMovies, changeMovies, guestSessionId } = movies;
   const [totalResults, setTotalResults] = useState();
   const [valueSearch, setValueSearch] = useState('');
   const [genresList, setGenresList] = useState([]);
   const [servises, setServises] = useState({
      error: false,
      noresult: false,
      loader: false,
   });

   const { error, noresult, loader } = servises;

   const changeNoresult = () => {
      setServises((prev) => ({ ...prev, noresult: !prev.noresult }));
   };

   const getMovies = useCallback(
      (value) => {
         if (value.trim() === '') return;
         setServises((prev) => ({ ...prev, loader: !prev.loader }));
         apiGetMovies(value.trim())
            .then((data) => {
               if (!data.results.length) {
                  changeNoresult();
                  setTimeout(() => changeNoresult(), 2000);
                  setServises((prev) => ({ ...prev, loader: !prev.loader }));
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
               setMovies((prev) => ({ ...prev, guestSessionId: data }));
            });
         }

         if (!genresList.length) {
            getGenresMovies().then((data) => {
               setGenresList(data);
            });
         }
      },
      [genresList.length, guestSessionId.length],
   );

   const startDebounce = useMemo(
      () =>
         debounce((value) => {
            getMovies(value);
         }, 500),
      [getMovies],
   );

   const handleChangeValue = (evt) => {
      evt.preventDefault();
      if (noresult) {
         setServises((prev) => ({ ...prev, noresult: !prev.noresult }));
      }
      setValueSearch(evt.target.value);
      startDebounce(evt.target.value);
   };

   const handleNextPage = (evt) => {
      ApiNextPage(valueSearch, evt).then((data) => {
         setMovies((prev) => ({ ...prev, allMovies: data.results }));
      });
   };

   const changeAllRatesMovies = () => {
      setServises((prev) => ({ ...prev, loader: !prev.loader }));
      getRatingMovies(1, guestSessionId)
         .then((data) => {
            setMovies((prev) => ({ ...prev, ratesMovies: data.results }));
            setServises((prev) => ({ ...prev, loader: !prev.loader }));
         })
         .catch((err) => {
            console.log(err);
            setServises((prev) => ({ ...prev, error: !prev.error }));
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
