import Button from "@mui/material/Button";
import "./GenreBtn.css";


export function GenreBtn({  setSelectedGenre }) {

  const Genres = [
    {
      "id": 18,
      "name": "Drama"
    },
      {
        "id": 28,
        "name": "Action"
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
        "id": 27,
        "name": "Horror"
      },

    ]
 
  

  return (
    <div className='containergenres'>
      {Genres?.map((genre) => (
        <Button
          onClick={() => {
            setSelectedGenre(genre.id);
          }}
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
          onClick={() => setSelectedGenre("")}
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
