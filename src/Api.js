import axios from 'axios';
// const api_key = '9420f971c77382011b10789475bfd7fa';
const baseUrl = 'https://api.themoviedb.org//search/movie';
const apiKey = 'fe1e2a68fe8bdd299a2072adcc00e09a';

export const apiGetMovies = async (query) => {
   const url = `${baseUrl}?api_key=${apiKey}&query=${query}`;
   const response = await axios.get(url).then((data) => {
      return data.data;
   });
   return response;
};

export const ApiNextPage = async (query, number) => {
   const url = `${baseUrl}?api_key=${apiKey}&query=${query}&page=${number}`;
   const response = await axios
      .get(url)
      .then((data) => {
         return data.data;
      })
      .catch((error) => {
         console.log(error);
      });
   return response;
};

export const getGenresMovies = async () => {
   const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
   const response = await axios
      .get(url)
      .then((data) => {
         return data.data.genres;
      })
      .catch((error) => {
         console.log(error);
      });
   return response;
};
