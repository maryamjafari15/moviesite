import "./MoviePageSide.css";
import { GenreBtn2 } from "../GenreBtn2/GenreBtn2";
import { DateBtn } from "../DateBtn/DateBtn";
import PropTypes from "prop-types";

export function MoviePageSide({
  setSelectedGenre,
  setMaxDate,
  setMinDate,
  type,
}) {
  return (
    <div className='MoviePageSide'>
      <h2>Genres</h2>
      <GenreBtn2 setSelectedGenre={setSelectedGenre} type={type} />
      <h2 className='dateh2'>
        {type === "movie" ? "Release Dates" : "Air Dates"}
      </h2>
      <DateBtn setMinDate={setMinDate} setMaxDate={setMaxDate} />
    </div>
  );
}
MoviePageSide.propTypes = {
  setSelectedGenre: PropTypes.func.isRequired,
  setMaxDate: PropTypes.func.isRequired,
  setMinDate: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
};
