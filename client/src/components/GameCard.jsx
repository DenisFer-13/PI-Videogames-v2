import React from "react";
import style from "../styles/GameCard.module.css";

export default function GameCard({ name, background_image, genre, rating }) {
  return (
    <div className={style.card}>
      <img
        className={style.img}
        src={background_image}
        alt="Imagen inexistente"
      />
      <h3 className={style.h3}>Name: {name}</h3>
      <h4 className={style.h4}>Genres: {genre}</h4>
      <h4>Rating: {rating}</h4>
    </div>
  );
}
