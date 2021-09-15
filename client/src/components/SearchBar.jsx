import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findGameByName } from "../actions";
import image from "../img/henry.jpg";
import style from "../styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInputChange = function (e) {
    setInput(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(findGameByName(input));
  };

  return (
    <div className={style.div}>
      <div className={style.logo}>
        <Link to="/">
          <img src={image} height="50px" alt="No pictures" />
        </Link>
      </div>
      <div className={style.searchbar}>
        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setInput("");
          }}
        >
          <input
            className={style.input}
            type="text"
            placeholder="Find a game..."
            value={input}
            onChange={(e) => handleInputChange(e)}
          />
          <input className={style.button} type="submit" value="SEARCH" />
        </form>
      </div>
    </div>
  );
}
