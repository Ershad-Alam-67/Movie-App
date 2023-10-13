import React, { useState, useEffect } from "react"
import MoviesList from "./components/MoviesList"
import Loader from "./components/Loader"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getMovies() {
    try {
      setIsLoading(true)
      const response = await fetch("https://swapi.dev/api/films")
      setIsLoading(false)
      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error
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
        {isLoading ? <Loader /> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  )
}

export default App
