import Button from "@mui/material/Button";
import "./TvshowBtn.css";
import { useState } from "react";


export function TvshowBtn({ setCategory }) {
  const [activeCategory, setActiveCategory] = useState("popular");

  const TvshowBtnName = [
    "popular", "on TV",  "top_rated" , "Airing Today"

    ]
 const handleButtonClick = (name) => {
  setActiveCategory(name);
    setCategory(name);
  };
  

  return (
    <div className='containergenres'>
      {TvshowBtnName?.map((name , index) => (
        <Button
          onClick={() => {
            handleButtonClick(name);
          }}
          key={index}
          variant='outlined'
          sx={{
            color:
            activeCategory === name
                ? "primary.contrastText"
                : "primary.main",
            backgroundColor:
            activeCategory === name ? "primary.main" : "transparent",
            width: "170px",
            borderRadius: "25px",
            transition: "0.5s",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          {name}
        </Button>
      ))}
    
     
    </div>
  );
}
