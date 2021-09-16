import React from "react";
import { Link } from "react-router-dom";
import image from "../img/error-404-not-found.jpg";
import style from "../styles/GameDetail.module.css";

export default function NotCategory() {
    return (
        <div className={style.notcategorydiv}>
            <Link to="/videogames">
            <button className={style.goback} >GO BACK</button>
            </Link>
            <img className={style.img2} src={image} alt="No picture."/>
        </div>
    )
}