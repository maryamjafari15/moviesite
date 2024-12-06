import { useMediaQuery, useTheme, Button } from "@mui/material";
import "./GenreBtn2.css";
import { useState } from "react";

export function GenreBtn2({  setSelectedGenre , type }) {
  const [activeGenre, setActiveGenre] = useState("");
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const Genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }

    ]

    const Genres2 = [
      {
        id: 10759,
        name: "Action & Adventure",
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
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 10762,
        name: "Kids",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10763,
        name: "News",
      },
      {
        id: 10764,
        name: "Reality",
      },
      {
        id: 10765,
        name: "Sci-Fi & Fantasy",
      },
      {
        id: 10766,
        name: "Soap",
      },
      {
        id: 10767,
        name: "Talk",
      },
      {
        id: 10768,
        name: "War & Politics",
      },
      {
        id: 37,
        name: "Western",
      },
    ];

    const selectedGenres = type === "movie" ? Genres : Genres2;
 
    const handleButtonClick = (id) => {
      setActiveGenre(id);
      setSelectedGenre(id);
    };
  

  return (
    <div className='containergenres'>
      {selectedGenres?.map((genre) => (
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
            width: "fit-content",
            fontSize: isLargeScreen ? "10px" : isMediumScreen ? "8px" : "14px",
            transition: "0.5s",
            textWrap:"nowrap",
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
     
          onClick={() =>  handleButtonClick("")}
          variant="outlined"
          sx={{
            color: activeGenre === "" ? "primary.contrastText" : "primary.main",
            backgroundColor: activeGenre === "" ? "primary.main" : "transparent",
            borderRadius: "25px",
            width: isLargeScreen ? "100px" : isMediumScreen ? "80px" : "150px",
            fontSize: isLargeScreen ? "10px" : isMediumScreen ? "8px" : "14px",
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
 