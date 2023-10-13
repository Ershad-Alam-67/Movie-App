import React, { useState, useEffect } from "react"
import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])

  const getMovies = () => {
    fetch("https://swapi.dev/api/films")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json()
      })
      .then((data) => {
        setMovies(data.results)
      })
      .catch((error) => {
        console.error("Error fetching movies:", error)
      })
  }

  return (
    <React.Fragment>
      <section>
        <button
          onClick={() => {
            getMovies()
          }}
        >
          Fetch Movies
        </button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  )
}

export default App
