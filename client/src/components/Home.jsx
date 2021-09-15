import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllGames,
  getAllGenres,
  filterGamesByOrigin,
  filterGamesByGenres,
  resetFilters,
  alphabeticOrder,
  ratingOrder,
  resetHome,
} from "../actions";
import SearchBar from "./SearchBar.jsx";
import GameCard from "./GameCard.jsx";
import Paginate from "./Paginate.jsx";
import style from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((store) => store.gamesRender);
  const [order, setOrder] = useState("");
  const [currentPage, setCurretPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexFirstGame, indexLastGame);

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const paginate = (pageNumber) => {
    setCurretPage(pageNumber);
  };

  function handleReset() {
    dispatch(resetHome());
    dispatch(getAllGames());
    setCurretPage(1);
  }
  function handleFilter(e) {
    let filterOrigin = document.getElementById("filterOrigin").value;
    let filterGenres = document.getElementById("filterGenres").value;
    dispatch(filterGamesByOrigin(filterOrigin));
    dispatch(filterGamesByGenres(filterGenres));
    setOrder(`Ordenado ${e.target.value}`);
    setCurretPage(1);
  }
  function handleOrderAlph(e) {
    document.getElementById("orderRat").value = "All";
    let orderAlph = document.getElementById("orderAlph").value;
    dispatch(alphabeticOrder(orderAlph));
    setOrder(`Ordenado ${e.target.value}`);
    setCurretPage(1);
  }
  function handleOrderRat(e) {
    document.getElementById("orderAlph").value = "All";
    let orderRat = document.getElementById("orderRat").value;
    dispatch(ratingOrder(orderRat));
    setOrder(`Ordenado ${e.target.value}`);
    setCurretPage(1);
  }

  function handleResetFilters() {
    dispatch(resetFilters());
    document.getElementById("filterOrigin").value = "All";
    document.getElementById("filterGenres").value = "All";
    document.getElementById("orderAlph").value = "All";
    document.getElementById("orderRat").value = "All";
    setCurretPage(1);
  }

  return (
    <div>
      <div>
        <div>
          <SearchBar />
        </div>
        <div className={style.divhome}>
          <div className={style.divbuttons}>
            <button
              className={style.button}
              onClick={(e) => {
                handleReset(e);
              }}
            >
              RESET VIDEOGAMES
            </button>
            <Link to="/creategame">
              <button className={style.button}>CREATE GAME</button>
            </Link>
            <button
              className={style.button}
              onClick={(e) => {
                handleResetFilters(e);
              }}
            >
              RESET FILTERS
            </button>
          </div>
          <div className={style.containerfilter}>
            <div className={style.filter}>
              <div className={style.optionsBy}>
                FILTER BY ORIGIN:
                <select
                  id="filterOrigin"
                  className={style.select}
                  onChange={(e) => handleFilter(e)}
                >
                  <option value="All">All Games</option>
                  <option value="Existing">Existing Games</option>
                  <option value="Created">Created Games</option>
                </select>
              </div>
              <div className={style.optionsBy}>
                FILTER BY GENRES:
                <select
                  id="filterGenres"
                  className={style.select}
                  onChange={(e) => handleFilter(e)}
                >
                  <option value="All">All</option>
                  <option value="Action">Action</option>
                  <option value="Indie">Indie</option>
                  <option value="Casual">Casual</option>
                  <option value="Adventure">Adventure</option>
                  <option value="RPG">RPG</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Arcade">Arcade</option>
                  <option value="Plataformer">Platformer</option>
                  <option value="Racing">Racing</option>
                  <option value="Massively Multiplayer">
                    Massively Multiplayer
                  </option>
                  <option value="Sports">Sports</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Family">Family</option>
                  <option value="Board Games">Board Games</option>
                  <option value="Educational">Educational</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>
            <div className={style.sort}>
              <div className={style.optionsBy}>
                ORDER BY ALHPABETH:
                <select
                  id="orderAlph"
                  className={style.select}
                  onChange={(e) => handleOrderAlph(e)}
                >
                  <option value="All">Select</option>
                  <option value="a-z">Ascending</option>
                  <option value="z-a">Descending</option>
                </select>
              </div>
              <div className={style.optionsBy}>
                ORDER BY RATING:
                <select
                  id="orderRat"
                  className={style.select}
                  onChange={(e) => handleOrderRat(e)}
                >
                  <option value="All">Select</option>
                  <option value="asc">From best</option>
                  <option value="desc">From worse</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={style.gamediv}>
          {currentGames?.map((index) => {
            return (
              <Link
                className={style.card}
                to={`/videogame/${index.id}`}
                key={index.id}
              >
                <div>
                  <GameCard
                    key={index.id}
                    name={index.name}
                    background_image={index.background_image}
                    rating={index.rating}
                    genre={
                      index.genre
                        ? index.genre.map((index, ind) => (
                            <p key={ind}>{index}</p>
                          ))
                        : "N/A"
                    }
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <div className={style.divLP}>
          {currentGames.length < 1 ? (
            <div>
              <p>LOADING...</p>
              <div className={style.spinner}></div>
            </div>
          ) : (
            <button className={style.button} onClick={() => window.scrollTo(0, 0)}>GO UP</button>
          )}
        </div>
      </div>
      <div className={style.paginatediv}>
        <Paginate
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
