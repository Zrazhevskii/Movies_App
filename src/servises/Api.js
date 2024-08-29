import axios from 'axios';

const apiKey = '9420f971c77382011b10789475bfd7fa';
const baseUrl = 'https://api.themoviedb.org/3/';
// const apiKey = 'fe1e2a68fe8bdd299a2072adcc00e09a';
const MoviesUrl = new URL('search/movie', baseUrl);
const genreMoviesUrl = new URL('genre/movie/list', baseUrl);
const guestSessionUrl = new URL('authentication/guest_session/new', baseUrl);

export const apiGetMovies = (query) => {
   const queries = {
      api_key: apiKey,
      query,
   };

   const params = new URLSearchParams(queries);
   MoviesUrl.search = params.toString();
   const response = axios.get(MoviesUrl.toString()).then((data) => {
      return data.data;
   });
   return response;
};

export const ApiNextPage = (query, number) => {
   const queries = {
      api_key: apiKey,
      query,
      page: number,
   };

   const params = new URLSearchParams(queries);
   MoviesUrl.search = params.toString();

   const response = axios.get(MoviesUrl.toString()).then((data) => {
      return data.data;
   });
   return response;
};

export const getGenresMovies = () => {
   const queries = {
      api_key: apiKey,
   };

   const params = new URLSearchParams(queries);
   genreMoviesUrl.search = params.toString();

   const response = axios.get(genreMoviesUrl.toString()).then((data) => {
      return data.data.genres;
   });
   return response;
};

export const getGuestSession = () => {
   const queries = {
      api_key: apiKey,
   };
   const params = new URLSearchParams(queries);
   guestSessionUrl.search = params.toString();
   const url = guestSessionUrl.toString();
   const response = axios.get(url).then((data) => {
      console.log(data.data.guest_session_id);
      return data.data.guest_session_id;
   });
   return response;
};

export const addRating = (movieId, guestSessionId, value) => {
   const rateMovieUrl = new URL(`movie/${movieId}/rating`, baseUrl);
   axios.post(
      rateMovieUrl.toString(),
      { value },
      {
         params: {
            api_key: apiKey,
            guest_session_id: guestSessionId,
         },
      },
   );
};

export const getRatingMovies = (guestSessionId, page = 1) => {
   const getRatMovies = new URL(`guest_session/${guestSessionId}/rated/movies`, baseUrl);
   const response = axios
      .get(getRatMovies.toString(), {
         params: {
            page,
            api_key: apiKey,
         },
      })
      .then((data) => {
         return data.data;
      });

   return response;
};
