import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGames } from "../actions";
import image from "../img/error-404-not-found.jpg";
import style from "../styles/GameDetail.module.css";

export default function NotCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      dispatch(getAllGames());
    };
  }, []);

  return (
    <div className={style.notcategorydiv}>
      <Link to="/videogames">
        <button className={style.goback}>GO BACK</button>
      </Link>
      <img className={style.img2} src={image} alt="No picture." />
    </div>
  );
}
