import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createGame, getAllGames, resetFilters, resetHome } from "../actions";
import style from "../styles/CreateGame.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CreateGame() {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    name: null,
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genre: [],
    background_image: "",
  });

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is requiered";
    }
    if (!input.rating) {
      errors.rating = "Rating is requiered";
    }
    if (input.genre.length < 1) {
      errors.genre = "You should select an option";
    }
    if (input.platforms.length < 1) {
      errors.platforms = "You should select an option";
    }
    return errors;
  }

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!input.genre.includes(e.target.value)) {
      setInput({
        ...input,
        genre: [...input.genre, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          genre: e.target.value,
        })
      );
    } else {
      alert("That genre was selected!");
    }
  }

  function handleSelectPlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          platforms: e.target.value,
        })
      );
    } else {
      alert("That platforms was selected!");
    }
  }

  async function handleSubmit(e) {
    if (
      input.platforms.length > 0 &&
      input.genre.length > 0 &&
      !errors.name &&
      !errors.rating
    ) {
      e.preventDefault();
      dispatch(resetHome());
      await dispatch(createGame(input));
      dispatch(getAllGames());
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genre: [],
        background_image: "",
      });
      history.push("/videogames");
    } else {
      e.preventDefault();
      alert("Please complete requiered fields.");
    }
  }

  function handleDelete() {
    input.genre.pop();
    setInput({
      ...input,
      genre: input.genre,
    });
  }
  function handleDeletePlatforms() {
    input.platforms.pop();
    setInput({
      ...input,
      platforms: input.platforms,
    });
  }
  return (
    <div className={style.div}>
      <div>
        <Link to="/videogames">
          <button className={style.button}>GO BACK</button>
        </Link>
      </div>
      <h3 className={style.h3create}>Create your game</h3>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.divinput}>
          <label>Game Name:</label>
          <input
            className={(errors.name && "danger") || style.input}
            type="text"
            placeholder={errors.name || "Write a name..."}
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={style.divinput}>
          <label>Release Date:</label>
          <input
            className={style.input}
            type="date"
            placeholder="Write a date... MM/DD/YYYY"
            value={input.released}
            name="released"
            onChange={handleChange}
          />
        </div>
        <div className={style.divinput}>
          <label for="quantity">Rating:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="5"
            className={(errors.rating && "danger") || style.input}
            placeholder={errors.rating || "Write a rating...FROM 1 TO 5"}
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
        </div>
        <div className={style.divinput}>
          <label>Description:</label>
          <textarea
            className={style.textarea}
            type="text"
            placeholder="Write a description..."
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className={style.divinput}>
          <label>Image:</label>
          <input
            className={style.input}
            type="text"
            placeholder="Link to image..."
            value={input.background_image}
            name="background_image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Plataformas:</label>
          <select
            className={errors.platforms && "dangergenre"}
            onChange={(e) => handleSelectPlatforms(e)}
          >
            <option>PC</option>
            <option>Play Station 5</option>
            <option>Play Station 4</option>
            <option>Xbox One</option>
            <option>Xbox Series S/X</option>
            <option>Nintendo Switch</option>
            <option>iOS</option>
            <option>Android</option>
            <option>Nintendo 3DS</option>
            <option>Nintendo DS</option>
            <option>Nintendo DSi</option>
            <option>macOS</option>
            <option>Linux</option>
            <option>Xbox 360</option>
            <option>Play Station 3</option>
          </select>
          <ul>
            <ul className={style.li}>
              <p
                className={style.pclose}
                onClick={(e) => handleDeletePlatforms(e)}
              >
                X
              </p>
              <li>
                &nbsp;&nbsp;{input.platforms.map((index) => index + " - ")}
              </li>
            </ul>
          </ul>
        </div>
        <div>
          <label>Genres:</label>
          <select
            className={errors.genre && "dangergenre"}
            onChange={(e) => handleSelect(e)}
          >
            {genres.map((index) => (
              <option value={index.name} key={index.id}>
                {index.name}
              </option>
            ))}
          </select>
          <ul className={style.li}>
            <p className={style.pclose} onClick={(e) => handleDelete(e)}>
              X
            </p>
            <li>&nbsp;&nbsp;{input.genre.map((index) => index + " - ")}</li>
          </ul>
          <button className={style.button} type="submit">
            CREATE GAME
          </button>
        </div>
      </form>
    </div>
  );
}
