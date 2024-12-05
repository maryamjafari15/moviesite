import Button from "@mui/material/Button";
import "./MovieBtn.css";
import { useState } from "react";


export function MovieBtn({ setCategory }) {
  const [activeCategory, setActiveCategory] = useState("popular");

  const MovieBtnName = [
    "popular", "now_playing",  "top_rated" , "upcoming"

    ]
 const handleButtonClick = (name) => {
  setActiveCategory(name);
    setCategory(name);
  };
  

  return (
    <div className='containergenres'>
      {MovieBtnName?.map((name , index) => (
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
