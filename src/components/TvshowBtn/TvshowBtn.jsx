import{ useMediaQuery, useTheme, Button } from "@mui/material";
import "./TvshowBtn.css";
import { useState } from "react";


export function TvshowBtn({ setCategory }) {
  const [activeCategory, setActiveCategory] = useState("popular");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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
           width: isSmallScreen ? "80px" : isMediumScreen ? "120px" : "170px",
            fontSize: isSmallScreen ? "10px" : isMediumScreen ? "12px" : "14px",
            borderRadius: "25px",
            textWrap:"nowrap",
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
