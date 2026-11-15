import "./DateBtn.css";
import PropTypes from "prop-types";

export const DateBtn = ({ setMinDate, setMaxDate }) => {
  const handleMinDateChange = (event) => {
    setMinDate(event.target.value);
  };

  const handleMaxDateChange = (event) => {
    setMaxDate(event.target.value);
  };

  return (
    <div className='date-filter'>
      <label>
        From:
        <br />
        <input
          className='dateinput'
          type='date'
          onChange={handleMinDateChange}
        />
      </label>
      <label>
        To:
        <br />
        <input
          className='dateinput'
          type='date'
          onChange={handleMaxDateChange}
        />
      </label>
    </div>
  );
};
DateBtn.propTypes = {
  setMinDate: PropTypes.func.isRequired,
  setMaxDate: PropTypes.func.isRequired,
};
