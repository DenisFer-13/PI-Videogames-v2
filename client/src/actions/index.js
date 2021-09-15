import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ALPHABETIC_ORDER = "ALPHABETIC_ORDER";
export const RATING_ORDER = "RATING_ORDER";
export const RESET_FILTERS = "RESET_FILTERS";
export const GAME_DETAIL = "GAME_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const RESET_HOME = "RESET_HOME";

export const getAllGames = () => async (dispatch) => {
  const json = await axios.get(`http://localhost:3001/videogames`);
  dispatch({
    type: GET_ALL_GAMES,
    payload: json.data,
  });
};

export const getAllGenres = () => async (dispatch) => {
  const json = await axios.get(`http://localhost:3001/genres`);
  dispatch({
    type: GET_ALL_GENRES,
    payload: json.data,
  });
};

export const findGameByName = (name) => async (dispatch) => {
  try {
    const json = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    dispatch({
      type: GET_GAME_BY_NAME,
      payload: json.data,
    });
  } catch (error) {
    return alert("Videogame not found.");
  }
};
export const filterGamesByOrigin = function (payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};
export const filterGamesByGenres = function (payload) {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};
export const alphabeticOrder = function (payload) {
  return {
    type: ALPHABETIC_ORDER,
    payload,
  };
};
export const ratingOrder = function (payload) {
  return {
    type: RATING_ORDER,
    payload,
  };
};
export const resetFilters = function () {
  return {
    type: RESET_FILTERS,
  };
};
export function createGame(payload) {
  return async function () {
    try {
      const response = await axios.post(
        `http://localhost:3001/videogame`,
        payload
      );
      alert("Videogame sucessfully created!");
      return response;
    } catch (error) {
      alert("Something is wrong. Please complete the form again.");
    }
  };
}
export const gameDetail = (id) => async (dispatch) => {
  try {
    const json = await axios.get(`http://localhost:3001/videogame/${id}`);
    console.log(json.data);
    dispatch({
      type: GAME_DETAIL,
      payload: json.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const resetDetail = function () {
  return {
    type: RESET_DETAIL,
  };
};
export const resetHome = function () {
  return {
    type: RESET_HOME,
  };
};
