import React, { useState, useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
const InputForm = (props) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [title, setTitle] = useState("")
  const [o_text, setO_text] = useState("")
  const titleRef = useRef(null)
  const o_textRef = useRef(null)
  const addMovie = async () => {
    const newMovie = {
      title: titleRef.current.value,
      openingText: o_textRef.current.value,
      releaseDate: selectedDate,
    }
    const response = await fetch(
      "https://react-movies-d5125-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = await response.json()

    props.idSetter(data.name)
    props.getMovies()
  }

  return (
    <div>
      <div className=" flex flex-col justify-center ">
        <label htmlFor="title" className=" font-bold p-1 text-left  ">
          Title
        </label>
        <input
          type="text"
          ref={titleRef}
          className=" border border-solid  border-black rounded p-2 w-[100%]"
          placeholder=" Enter Title"
        ></input>
        <label htmlFor="o_text" className=" font-bold p-1  text-left">
          Opening Text
        </label>
        <textarea
          ref={o_textRef}
          className=" border p-2 rounded"
          rows="4"
          cols="50"
        ></textarea>

        <label htmlFor="date" className=" font-bold p-1 text-left  ">
          Release Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
          className=" border w-[100%] text-black rounded p-2"
          dateFormat="yyyy-MM-dd"
        />
        <div className=" flex justify-center">
          <button onClick={addMovie} className=" mt-3  ">
            Add Movie
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputForm
