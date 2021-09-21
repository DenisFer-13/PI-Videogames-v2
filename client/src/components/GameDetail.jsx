import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameDetail, resetDetail } from "../actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../styles/GameDetail.module.css";

export default function GameDetail({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameDetail(id));
    return function cleanup() {
      dispatch(resetDetail());
    };
  }, []);

  const game = useSelector((state) => state.gameDetail);

  return (
    <div>
      <Link className={style.a} to="/videogames">
        <button className={style.goback}>Go back</button>
      </Link>
      {game.length > 0 ? (
        <div className={style.divgame}>
          <div className={style.divgameImg}>
            <h2 className={style.h3det}>{game[0].name}</h2>
            <img
              className={style.img}
              src={game[0].background_image}
              alt="There are not pictures for this game"
            />
          </div>
          <div className={style.divgameDet}>
            <h3 className={style.h3det}>Genres: {`${game[0].genre}`}</h3>
            <p className={style.p}>{game[0].description}</p>
            <h3 className={style.h4det}>Release Date: {game[0].released}</h3>
            <h3 className={style.h4det}>Rating: {game[0].rating}</h3>
            <h3 className={style.h4det}>Platforms: {`${game[0].platforms}`}</h3>
          </div>
        </div>
      ) : (
        <div className={style.divLoad}>
          <p>LOADING...</p>
          <div className={style.spinner}></div>
        </div>
      )}
    </div>
  );
}
