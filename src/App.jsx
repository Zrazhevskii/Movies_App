import './App.css';
import { useState, useMemo, useCallback } from 'react';
import { Alert, Layout } from 'antd';
import debounce from 'lodash.debounce';
import { Content } from 'antd/es/layout/layout';
import Context from './utils/Context';
import MoviesHeader from './components/MoviesHeader/MoviesHeader';
import { apiGetMovies, ApiNextPage, getGenresMovies, getGuestSession, getRatingMovies } from './servises/Api';
import MoviesList from './components/MoviesList/MoviesList';
import MoviesFooter from './components/MoviesFooter/MoviesFooter';
import useNoConnectNetwork from './hooks/useNoConnectNetwork';

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
      errorInfo: '',
      noresult: false,
      noresultInfo: '',
      loader: false,
   });
   const { error, noresult, loader, errorInfo, noresultInfo } = servises;
   const storage = localStorage.getItem('key');

   const changeNoresult = (text) => {
      setServises((prev) => ({
         ...prev,
         noresult: !prev.noresult,
         noresultInfo: text,
      }));
   };

   const errorResult = (text) => {
      setServises((prev) => ({
         ...prev,
         error: !prev.error,
         errorInfo: text,
      }));
   };

   const getMovies = useCallback(
      (value) => {
         if (value.trim() === '') return;
         setServises((prev) => ({ ...prev, loader: !prev.loader }));
         apiGetMovies(value.trim())
            .then((data) => {
               if (!data.results.length) {
                  setServises((prev) => ({
                     ...prev,
                     loader: !prev.loader,
                  }));
                  changeNoresult(
                     'Вы не подумайте, мы не придираемся, но вы ищете что-то необычное, мы ничего не нашли(((',
                  );
                  setTimeout(() => changeNoresult(''), 2000);
               } else {
                  setTotalResults(data.total_results);
                  setMovies((prev) => ({ ...prev, allMovies: data.results }));
                  setServises((prev) => ({ ...prev, loader: !prev.loader }));
               }
            })
            .catch(() => {
               errorResult('Нет возможности связаться с сайтом, перегрузите страницу и попробуйте позже');
            });

         if (!guestSessionId.length) {
            if (!storage) {
               getGuestSession()
                  .then((data) => {
                     setMovies((prev) => ({ ...prev, guestSessionId: data }));
                     localStorage.setItem('key', data);
                  })
                  .catch(() => {
                     errorResult(
                        'Нет связи с сайтом и получить гостевую сессию. Пожалуйста перегрузитесь и попробуйте позже',
                     );
                  });
            } else if (storage) {
               setMovies((prev) => ({ ...prev, guestSessionId: storage }));
            }
         }

         if (!genresList.length) {
            getGenresMovies()
               .then((data) => {
                  setGenresList(data);
               })
               .catch(() => {
                  errorResult('Что-то пошло не так, перегрузите страницу и попробуйте позже');
               });
         }
      },
      [genresList.length, guestSessionId.length, storage],
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
         setMovies((prev) => ({ ...prev, allMovies: data.results })).catch(() => {
            errorResult('Сайт перестал с вами дружить, перегрузите страницу и попробуйте позже');
         });
      });
   };

   const getAllratesMovies = (id) => {
      getRatingMovies(id)
         .then((data) => {
            setMovies((prev) => ({ ...prev, ratesMovies: data.results }));
         })
         .catch(() => {
            errorResult(
               'Нет возможности получить список оцененных фильмов, пожалуйста перегрузите страницу и попробуйте позже',
            );
         });
      setServises((prev) => ({ ...prev, loader: !prev.loader }));
   };

   const changeAllRatesMovies = (evt) => {
      if (error) {
         errorResult('');
      }

      if (noresult) {
         changeNoresult('');
      }
      setMovies((prev) => ({ ...prev, changeMovies: !prev.changeMovies }));

      if (evt === 1) {
         if (loader) {
            setServises((prev) => ({ ...prev, loader: !prev.loader }));
         }
         return;
      }

      setServises((prev) => ({ ...prev, loader: !prev.loader }));
      if (!storage && !guestSessionId.length) {
         setServises((prev) => ({ ...prev, loader: !prev.loader }));
         changeNoresult('А вы еще ничего не и выбрали');
         setTimeout(() => changeNoresult(''), 2000);
         return;
      }
      if (storage && !guestSessionId.length) {
         setMovies((prev) => ({ ...prev, guestSessionId: storage }));
         getAllratesMovies(storage);
         return;
      }
      getAllratesMovies(guestSessionId);
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
            {!useNoConnectNetwork() ? (
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
                     guestSessionId={guestSessionId}
                     errorInfo={errorInfo}
                     noresultInfo={noresultInfo}
                  />
               </Content>
            )}
            <MoviesFooter totalResults={countMovies} handleNextPage={handleNextPage} />
         </Layout>
      </Context.Provider>
   );
}

export default App;
