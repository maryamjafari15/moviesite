import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function ProgressChart(props){
    const {percentage , text} = props
    return (
       <>
          <CircularProgressbar
           className="w-11 "
            value={percentage}
            text={text}
            styles={buildStyles({
              textColor: "#ffffff",
              pathColor: percentage > 50 ? "green" : "red",
              trailColor: "#d6d6d6",
              
            
            })}
          />
          
          </>
      );

} 