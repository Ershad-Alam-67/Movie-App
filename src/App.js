import React, { useState, useEffect } from "react"
import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])

  async function getMovies() {
    try {
      const response = await fetch("https://swapi.dev/api/films")

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error // You can re-throw the error or handle it as needed
    }
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
