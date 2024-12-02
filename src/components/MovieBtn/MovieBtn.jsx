import Button from "@mui/material/Button";
import "./MovieBtn.css";


export function MovieBtn({ setCategory }) {

  const MovieBtnName = [
    "popular", "now_playing",  "top_rated" , "upcoming"

    ]
 
  

  return (
    <div className='containergenres'>
      {MovieBtnName?.map((name , index) => (
        <Button
          onClick={() => {
            setCategory(name);
          }}
          key={index}
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
          {name}
        </Button>
      ))}
    
     
    </div>
  );
}
