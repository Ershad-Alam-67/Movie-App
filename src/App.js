import React, { useState, useEffect } from "react"
import MoviesList from "./components/MoviesList"
import Loader from "./components/Loader"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [retrying, setRetrying] = useState(false)

  async function getMovies() {
    try {
      setIsLoading(true)

      const response = await fetch("https://swapi.dev/api/film/")
      if (!response.ok) {
        throw new Error("Something went wrong...retrying")
      }
      const data = await response.json()

      console.log(response.ok)
      setMovies(data.results)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setRetrying(true)

      const retryInterval = setInterval(async () => {
        if (!retrying) {
          clearInterval(retryInterval)
          return
        }
        try {
          const response = await fetch("https://swapi.dev/api/film")
          if (!response.ok) {
            throw new Error("something went wrong...retrying")
          }
          const data = await response.json()

          setMovies(data.results)

          setIsLoading(false)
          setRetrying(false)
          clearInterval(retryInterval)
        } catch (err) {
          console.log(err)
          setError(err.message)
          console.log(err)
        }
      }, 5000)
    }
  }

  const cancelRetry = () => {
    setRetrying(false)
    console.log(error)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={() => getMovies()}>Fetch Movies</button>
      </section>
      <section>
        {retrying && <button onClick={cancelRetry}>Cancel Retry</button>}

        {retrying && isLoading ? (
          <div>
            <Loader />
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
    </React.Fragment>
  )
}

export default App
