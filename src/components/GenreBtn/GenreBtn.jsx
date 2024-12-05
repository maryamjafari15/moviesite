import { useMediaQuery, useTheme, Button } from "@mui/material";
import "./GenreBtn.css";
import { useState } from "react";

export function GenreBtn({ setSelectedGenre }) {
  const [activeGenre, setActiveGenre] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Genres = [
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 28,
      name: "Action",
    },

    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },

    {
      id: 27,
      name: "Horror",
    },
  ];

  const handleButtonClick = (id) => {
    setActiveGenre(id);
    setSelectedGenre(id);
  };

  return (
    <div className='containergenres'>
      {Genres?.map((genre) => (
        <Button
          onClick={() => handleButtonClick(genre.id)}
          key={genre.id}
          variant='outlined'
          sx={{
            color:
              activeGenre === genre.id
                ? "primary.contrastText"
                : "primary.main",
            backgroundColor:
              activeGenre === genre.id ? "primary.main" : "transparent",
            borderRadius: "25px",
            width: isSmallScreen ? "100px" : isMediumScreen ? "120px" : "150px",
            transition: "0.5s",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          {genre.name}
        </Button>
      ))}
      <Button
        onClick={() => handleButtonClick("")}
        variant='outlined'
        sx={{
          color: activeGenre === "" ? "primary.contrastText" : "primary.main",
          backgroundColor: activeGenre === "" ? "primary.main" : "transparent",
          borderRadius: "25px",
          width: isSmallScreen ? "100px" : isMediumScreen ? "120px" : "150px",
          
          transition: "0.5s",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        All
      </Button>
    </div>
  );
}
