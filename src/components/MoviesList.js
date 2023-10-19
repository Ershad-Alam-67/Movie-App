import React from "react"

import Movie from "./Movie"
import classes from "./MoviesList.module.css"

const MovieList = (props) => {
  console.log(props.id)
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          moviesHandler={props.moviesHandler}
          id={props.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          getMovies={props.getMovies}
        />
      ))}
    </ul>
  )
}

export default MovieList
