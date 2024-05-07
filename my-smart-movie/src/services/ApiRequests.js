import apiTMDB from "./apiInterceptor";


export const handleLogin = async () => {
  const response = await apiTMDB.get("/authentication/guest_session/new");
  return response.data;
};

export const getMovieList = async (page=1) => {
  const response = await apiTMDB.get("/movie/popular",{params:{page}});
  return response.data
}

export const getConfiguration = async () => {
  const response = await apiTMDB.get("/configuration");
  return response.data;
};

export const getWantedMovies = async (specificWord) => {
  const response = await apiTMDB.get("/search/movie",
    {params: { query: specificWord, include_adult: false }}
  );
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await apiTMDB.get(`/movie/${movieId}`)
  return response.data
}

export const getMovieGenre = async () => {
  const response = await apiTMDB.get(`/genre/movie/list`)

  return response.data
   // return Promise.resolve(WANTED_MOVIES_FAKE)
}

export const getFilteredMovies = async (params) => {
  const response = await apiTMDB.get(`/discover/movie`, {params})
  return response.data
}

export const toggleFavorite = async (movieId, isFavorite, accountId = "21215400") => {
  const body= {
    media_type: "movie",
    media_id: movieId,
    favorite: isFavorite,
  }
  const response = await apiTMDB.post(
    `/account/${accountId}/favorite`, body,
    {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2EwNTU5YzNjYWFiOWQ2NTc4ZGU2ZTM4N2EyMjViNiIsInN1YiI6IjY2MWQ1NTM4NGNhNjc2MDE4NzFjZTdlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ar5fRjvsx5O_M1QUyL_VE2c0xjVmQEKzmu2pwV0roHo'
      },
    },
    { params: { session_id: "1fa03249f7802528e1ac89c630f206d94ae230e3" } },
    
  );
  return response.data
};

export const getFavoriteMovies  = async (accountId = "21215400") => {
  const response = await apiTMDB.get(`/account/${accountId}/favorite/movies`, {
    params: { session_id: "1fa03249f7802528e1ac89c630f206d94ae230e3" },
  });
  return response.data
};

// Request useful for authentication process
export const getToken = async () => {
    const response = await apiTMDB.get(`/authentication/token/new`)
    console.log(response)
    return response.data
}



