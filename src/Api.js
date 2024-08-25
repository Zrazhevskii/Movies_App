import axios from 'axios';
// const apiKey = '9420f971c77382011b10789475bfd7fa';
const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'fe1e2a68fe8bdd299a2072adcc00e09a';

export const apiGetMovies = async (query) => {
   const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`;
   const response = await axios.get(url).then((data) => {
      return data.data;
   });
   return response;
};

export const ApiNextPage = async (query, number) => {
   const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${number}`;
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
   const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
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

export const getGuestSession = async () => {
   const url = `${baseUrl}/authentication/guest_session/new`;
   const response = await axios
      .get(url, {
         params: {
            api_key: apiKey,
         },
      })
      .then((data) => {
         return data.data.guest_session_id;
      });
   return response;
};

export const addRating = async (movieId, guestSessionId, value) => {
   const url = `${baseUrl}/movie/${movieId}/rating`;
   await axios
      .post(
         url,
         { value },
         {
            params: {
               api_key: apiKey,
               guest_session_id: guestSessionId,
            },
         },
      )
      .catch((error) => {
         console.log(error);
      });
};

export const getRatingMovies = async (page, guestSessionId) => {
   const url = `${baseUrl}/guest_session/${guestSessionId}/rated/movies`;
   const response = await axios
      .get(url, {
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
