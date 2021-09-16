import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  GET_GAME_BY_NAME,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRES,
  ALPHABETIC_ORDER,
  RATING_ORDER,
  RESET_FILTERS,
  GAME_DETAIL,
  RESET_DETAIL,
  RESET_HOME,
} from "../actions";

const initialState = {
  gamesRender: [],
  totalGames: [],
  gameDetail: [],
  genres: [],
  objectNull: [
    {
      id: "404notfound",
      name: "There are no games for this search.",
      background_image:
        "https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg",
      rating: 'Click for go back!'
    },
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        gamesRender: action.payload,
        totalGames: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_GAME_BY_NAME:
      return {
        ...state,
        gamesRender: action.payload,
        totalGames: action.payload,
      };
    case FILTER_BY_ORIGIN:
      const allGamesOrigin = state.totalGames;
      const gamesFilteredOrigin =
        action.payload === "Created"
          ? allGamesOrigin.filter((index) => index.createdInDb)
          : allGamesOrigin.filter((index) => !index.createdInDb);
      return {
        ...state,
        gamesRender:
          action.payload === "All" ? allGamesOrigin : gamesFilteredOrigin,
      };
    case FILTER_BY_GENRES:
      const allGamesByOrigin = state.gamesRender;
      const gamesFiltered =
        action.payload === "All"
          ? allGamesByOrigin
          : allGamesByOrigin.filter((index) =>
              index.genre.includes(action.payload)
            );
      return {
        ...state,
        gamesRender:
          gamesFiltered.length > 0 ? gamesFiltered : state.objectNull,
      };
    case ALPHABETIC_ORDER:
      let gamesByAlphabeth =
        action.payload === "a-z"
          ? state.gamesRender.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              } else return 0;
            })
          : state.gamesRender.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              } else return 0;
            });
      return {
        ...state,
        gamesRender: gamesByAlphabeth,
      };
    case RATING_ORDER:
      let gamesByRating =
        action.payload === "asc"
          ? state.gamesRender.sort(function (a, b) {
              if (a.rating < b.rating) {
                return 1;
              }
              if (a.rating > b.rating) {
                return -1;
              } else return 0;
            })
          : state.gamesRender.sort(function (a, b) {
              if (a.rating < b.rating) {
                return -1;
              }
              if (a.rating > b.rating) {
                return 1;
              } else return 0;
            });
      return {
        ...state,
        gamesRender: gamesByRating,
      };
    case RESET_HOME:
      return {
        ...state,
        gamesRender: [],
        totalGames: [],
      };
    case RESET_FILTERS:
      return {
        ...state,
        gamesRender: state.totalGames,
      };
    case GAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case RESET_DETAIL:
      return {
        ...state,
        gameDetail: [],
      };
    default:
      return state;
  }
}

export default rootReducer;
