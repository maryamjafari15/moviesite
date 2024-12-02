import Button from "@mui/material/Button";
import "./GenreBtn.css";
import { useState } from "react";

export function GenreBtn({  setSelectedGenre }) {

  const [activeGenre, setActiveGenre] = useState("");

  const Genres = [
    {
      "id": 18,
      "name": "Drama",
      
    },
      {
        "id": 28,
        "name": "Action",
       
      },
     
      {
        "id": 16,
        "name": "Animation",
        
      },
      {
        "id": 35,
        "name": "Comedy",
       
      },
    
  
      {
        "id": 27,
        "name": "Horror",
       
      },

    ]
 
    const handleButtonClick = (id) => {
      setActiveGenre(id);
      setSelectedGenre(id);
    };

  return (
    <div className='containergenres'>
      {Genres?.map((genre) => (
        <Button
        className={activeGenre === genre.id ? "active" : undefined}
          onClick={() => handleButtonClick(genre.id)}
          key={genre.id}
          variant='outlined'
          sx={{
            color: "primary.main",
            borderRadius: "25px",
            width: "150px",
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
      className={activeGenre === "" ? "active" : undefined}
          onClick={() => handleButtonClick("")}
          variant="outlined"
          sx={{
            color: "primary.main",
            borderRadius: "25px",
            width: "150px",
            marginLeft: "10px",
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
 