import React from "react";
import style from "../styles/Home.module.css";

export default function Paginate({ gamesPerPage, allGames, paginate }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={style.paginate}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={style.li} key={number}>
              <button
                className={style.buttonli}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
