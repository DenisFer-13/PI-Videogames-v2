const { Router } = require("express");
const axios = require("axios");
const { Genre, Videogame } = require("../db");
const { apiKey } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAER TODOS LOS JUEGOS DE LA API.
const getAllGamesApi = async () => {
  const apiGames1 = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=1`
  );
  const apiGames2 = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=2`
  );
  const apiGames3 = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=3`
  );
  const apiGames4 = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=4`
  );
  const apiGames5 = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&page=5`
  );

  const apiTotalGames = apiGames1.data.results.concat(
    apiGames2.data.results,
    apiGames3.data.results,
    apiGames4.data.results,
    apiGames5.data.results
  );

  const apiGames = await apiTotalGames.map((index) => {
    return {
      id: index.id,
      name: index.name,
      background_image: index.background_image,
      rating: index.rating,
      genre: index.genres.map((index) => index.name),
      platforms:
        index.platforms === null
          ? "No están especificas las plataformas."
          : index.platforms.map((index) => index.platform.name),
    };
  });
  return apiGames;
};

//TRAER JUEGOS DE LA API POR BÚSQUEDA A TRAVÉS DE QUERY.
const getGamesApiBySearch = async (name) => {
  const apiGamesResult = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${apiKey}`
  );
  const apiGamesBySearch = await apiGamesResult.data.results.map((index) => {
    return {
      id: index.id,
      name: index.name,
      background_image: index.background_image,
      rating: index.rating,
      genre: index.genres.map((index) => index.name),
      platforms:
        index.platforms === null
          ? "No están especificas las plataformas."
          : index.platforms.map((index) => index.platform.name),
    };
  });
  const apiSearchSlice = apiGamesBySearch.slice(0, 15);
  return apiSearchSlice;
};

//TRAER LOS JUEGOS DE LA API POR BÚSQUEDA A TRAVÉS DE ID.
const getGamesApiById = async (id) => {
  try {
    const apiGamesId = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`
    );
    const apiGamesById = {
      id: apiGamesId.data.id,
      name: apiGamesId.data.name,
      description: apiGamesId.data.description_raw,
      released: apiGamesId.data.released,
      rating: apiGamesId.data.rating,
      background_image: apiGamesId.data.background_image,
      genre: apiGamesId.data.genres.map((index) => index.name),
      platforms:
        apiGamesId.data.platforms === null ||
        apiGamesId.data.platforms.length === 0
          ? "No están especificas las plataformas."
          : apiGamesId.data.platforms.map((index) => index.platform.name),
    };
    return apiGamesById;
  } catch {
    return [];
  }
};

//DATOS DE LA DATABASE.
//TRAER TODOS LOS JUEGOS CREADOS.
const getAllGamesDb = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//TRAER LOS JUEGOS CREADOS BUSCANDO POR NOMBRE.
const getGamesDbBySearch = async (name) => {
  const auxArr = await getAllGamesDb();
  const auxGames = auxArr.map((index) => {
    return {
      id: index.dataValues.id,
      name: index.dataValues.name,
      background_image: index.dataValues.background_image,
      rating: index.dataValues.rating,
      genre: index.dataValues.genres.map((index) => index.name),
      platforms: index.dataValues.platforms,
      createdInDb: index.dataValues.createdInDb,
    };
  });
  const gamesDbByName = auxGames.filter((index) =>
    index.name.toLowerCase().includes(name.toLowerCase())
  );
  return gamesDbByName;
};

//TRAER LOS JUEGOS CREADOS BUSCANDO POR ID.
const getGamesDbById = async (id) => {
  const auxArr = await getAllGamesDb();
  const auxGames = auxArr.map((index) => {
    return {
      id: index.dataValues.id,
      name: index.dataValues.name,
      description: index.dataValues.description,
      released: index.dataValues.released,
      rating: index.dataValues.rating,
      background_image: index.dataValues.background_image,
      genre: index.dataValues.genres.map((index) => index.name),
      platforms: index.dataValues.platforms,
      createdInDb: index.dataValues.createdInDb,
    };
  });
  const gamesDbById = auxGames.filter((index) => index.id === id);
  return gamesDbById;
};

//TRAER TODOS LOS JUEGOS COMBINADOS DE LA API Y LA DB.
const getAllGamesApiDb = async () => {
  const gamesApi = await getAllGamesApi();
  const auxGamesDb = await getAllGamesDb();
  const gamesDb = auxGamesDb.map((index) => {
    return {
      id: index.id,
      name: index.name,
      background_image: index.background_image,
      rating: index.rating,
      genre: index.genres.map((index) => index.name),
      platforms: index.platforms,
      createdInDb: index.createdInDb,
    };
  });
  const totalGamesApiDb = gamesApi.concat(gamesDb);
  return totalGamesApiDb;
};

//TRAER TODOS LOS JUEGOS COMBINADOS DE LA API Y LA DB POR BÚSQUEDA A TRAVÉS DE QUERY.
const getAllGamesBySearch = async (name) => {
  const gamesApi = await getGamesApiBySearch(name);
  const gamesDb = await getGamesDbBySearch(name);
  const totalGamesApiDb = gamesApi.concat(gamesDb);
  return totalGamesApiDb;
};

//TRAER TODOS LOS JUEGOS COMBINADOS DE LA API Y LA DB POR BÚSQUEDA A TRAVÉS DE ID.
const getAllGamesById = async (id) => {
  const gamesApi = [await getGamesApiById(id)];
  const gamesDb = await getGamesDbById(id);
  const aux = gamesApi.concat(gamesDb);
  const totalGamesApiDb = aux.filter((index) => index.length !== 0);
  return totalGamesApiDb;
};

//TRAER TODOS LOS GÉNEROS Y LOS GUARDA EN LA DATABASE.
const getGenres = async () => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${apiKey}`
  );
  const genres = genresApi.data.results.map((index) => [index.name]);
  const eachGenre = genres.map((index) => {
    for (let i = 0; i < genres.length; i++) {
      return index[i];
    }
  });
  eachGenre.forEach((index) => {
    Genre.findOrCreate({
      where: { name: index },
    });
  });
  const allGenres = await Genre.findAll();
  return allGenres;
};

//RUTA DE VIDEOGAMES TOTALES Y POR BÚSQUEDA.
router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  if (name) {
    const gamesByName = await getAllGamesBySearch(name);
    if (gamesByName.length > 0) {
      res.status(200).send(gamesByName);
    } else {
      res.status(404).send("Videogame not found.");
    }
  } else {
    const totalGames = await getAllGamesApiDb();
    res.status(200).send(totalGames);
  }
});

//RUTA DE VIDEOGAMES POR ID.
router.get("/videogame/:id", async (req, res) => {
  const id = req.params.id;
  const gameById = await getAllGamesById(id);
  if (gameById.length > 0) {
    res.status(200).send(gameById);
  } else {
    res.status(404).send("Videogame not found.");
  }
});

//RUTA DE GÉNEROS TOTALES.
router.get("/genres", async (req, res) => {
  const allGenresApi = await getGenres();
  res.status(200).send(allGenresApi);
});

//RUTA DE CREACION DE VIDEOGAME (POST).
router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    genre,
    platforms,
    background_image,
    createdInDb,
  } = req.body;
  try {
    let genreDb = await Genre.findAll({
      where: { name: genre },
    });
    let gameCreated = await Videogame.create({
      name,
      description,
      released,
      rating,
      genre,
      platforms,
      background_image,
      createdInDb,
    });
    gameCreated.addGenre(genreDb);
    res.status(200).send("Game succesfully added.");
  } catch {
    res.status(404).send("Some data is missing.");
  }
});

module.exports = router;
