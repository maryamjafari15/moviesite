import Button from '@mui/material/Button';
import "./GenreBtn.css";



export function GenreBtn(){

   const Genres=["Drama" , "Action" ,"Comedy" , "Horror" , "Other" ] ;

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
           width:"200px",
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