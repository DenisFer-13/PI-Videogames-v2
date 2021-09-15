import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGames } from "../actions";
import { Link } from "react-router-dom";
import style from "../styles/Landing.module.css";

export default function Landing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);
  return (
    <div className={style.div}>
      <Link to="/videogames">
        <div className={style.button}>ENTER TO GAMEHUB WEBSITE!</div>
      </Link>
      <p className={style.text}>
        Welcome to my videogame page! | By Denis Ferreyra - Henry Student
      </p>
    </div>
  );
}
