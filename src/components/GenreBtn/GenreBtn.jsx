import Button from '@mui/material/Button';
import "./GenreBtn.css";



export function GenreBtn(){

   const Genres=["Drama" , "Action" ,"Sci-Fi" , "Horror" , "Animation", "Other" ] ;

    return(
 <div className='containergenres'>
 {
    Genres?.map((genre , index)=>(
       
        <Button 
        key={index}
        variant="outlined"
        sx={{
           color:"primary.main",
           borderRadius:"25px",
           width:"150px",
           transition:"0.5s",
             '&:hover': {   
               backgroundColor:"primary.main",
               color:"primary.contrastText" ,
             }, 
        }}
        >
          {genre}</Button>
          ))
 }

    </div>
    )
}