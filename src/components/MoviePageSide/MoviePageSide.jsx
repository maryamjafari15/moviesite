
import "./MoviePageSide.css"
import { GenreBtn2 } from "../GenreBtn2/GenreBtn2";
import {DateBtn}from "../DateBtn/DateBtn"

export function MoviePageSide({setSelectedGenre ,setMaxDate , setMinDate , type}){

    return(
        <div className="MoviePageSide">
            <h2>Genres</h2>
            <GenreBtn2  setSelectedGenre={setSelectedGenre} type={type}/>                                
            <h2 className="dateh2">{type==="movie"?"Release Dates": "Air Dates"}</h2>
            <DateBtn setMinDate={setMinDate} setMaxDate={setMaxDate} />
        </div>
    )
}