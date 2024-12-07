import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function ProgressChart(props) {
  const { percentage, text } = props;
  return (
    <>
      <div style={{ width: '50px', height: '50px' }}>
        <CircularProgressbar
          value={percentage}
          text={text}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: percentage > 50 ? "green" : "red",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </>
  );
}
