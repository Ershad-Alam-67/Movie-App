import React, { useState, useEffect, useCallback } from "react"
import MoviesList from "./components/MoviesList"
import Loader from "./components/Loader"
import "./App.css"
import InputForm from "./components/InputForm"

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retrying, setRetrying] = useState(false)
  const [id, setId] = useState("")

  const getMovies = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://react-movies-d5125-default-rtdb.firebaseio.com/movies.json"
      )

      if (!response.ok) {
        throw new Error("Network response was not ok..Retrying...")
      }
      const data = await response.json()

      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }
      setMovies(loadedMovies)
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setRetrying(true)

      const retryInterval = setInterval(async () => {
        if (!retrying) {
          clearInterval(retryInterval)
          return
        }
        try {
          const response = await fetch("https://swapi.dev/api/films")
          if (!response.ok) {
            throw new Error("Retrying")
          }
          const data = await response.json()
          setMovies(data.results)
          setError(null)
          setIsLoading(false)
          setRetrying(false)
          clearInterval(retryInterval)
        } catch (err) {
          setError(err.message)
        }
      }, 5000)
    }
  })

  const cancelRetry = () => {
    setRetrying(false)
    setIsLoading(false)
    setError("Failed to fetch data")
  }

  useEffect(() => {
    getMovies()
  }, [])
  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <React.Fragment>
      <section>
        <InputForm getMovies={getMovies} idSetter={setId}></InputForm>
      </section>
      <section>
        <button onClick={() => getMovies()}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !retrying && <Loader />}
        {isLoading && retrying ? (
          <div>
            <Loader />
            <h1 className=" mt-3">{error}</h1>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <MoviesList
            id={id}
            movies={movies}
            getMovies={getMovies}
            moviesHandler={setMovies}
          />
        )}
        {retrying && (
          <button className="mt-3" onClick={cancelRetry}>
            Cancel Retry
          </button>
        )}
      </section>
    </React.Fragment>
  )
}

export default App
