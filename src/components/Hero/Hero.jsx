import "./Hero.css";
import Fab from '@mui/material/Fab';
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";
import{LikeButton} from"./LikedButton"



export function Hero(props) {
    const{ title , overview , id}= props.data;
    
    const navigate = useNavigate();
  const routeChange = (mediaType ,title  , id) => {
    let path = `/MovieDetails/${mediaType}/${title}/${id}}`;
    navigate(path);
  };

  return (
    <motion.div
            initial={{ y: 100, opacity: 0 }}   
            animate={{ y: 0, opacity: 1 }}      
            transition={{ duration: 1.5 , ease: "easeOut" }} 
            className='container3'
        >

      <div>
        <h1 className="title"> {title} </h1>
        <p className="text">{overview}</p>
      </div>
      <div className="btnContainer">
      <Fab
      onClick={() => routeChange("movie" , title , id)}
      sx={{
        borderRadius:"25px"
      }} variant="extended" size="medium" color= "">
    
        Watch Now
      </Fab>
      <Fab 
     
      size="small" color="primary" aria-label="add">
        
        <LikeButton/>

      </Fab>
      </div>
    
    </motion.div>
  );
}
