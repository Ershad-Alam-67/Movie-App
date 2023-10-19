import React, { useState } from "react"
import classes from "./Movie.module.css"

const Movie = (props) => {
  console.log(props.id)
  const releaseDate = new Date(props.releaseDate)
  const deleteMovie = async (id) => {
    const response = await fetch(
      `https://react-movies-d5125-default-rtdb.firebaseio.com/movies/${props.id}.json`,
      {
        method: "DELETE",
      }
    )
    props.getMovies()
  }

  const formattedDate = releaseDate.toISOString().split("T")[0]

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{formattedDate}</h3>
      <p>{props.openingText}</p>
      <button
        onClick={() => {
          deleteMovie(props.key)
        }}
        className=" bg-indigo-700 mt-1 py-1 px-3 text-amber-300 text-center"
      >
        Delete
      </button>
    </li>
  )
}

export default Movie
