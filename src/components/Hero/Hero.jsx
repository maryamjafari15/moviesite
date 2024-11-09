import "./Hero.css";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";



export function Hero(props) {
    const{ title , overview}= props.data;
    const navigate = useNavigate();

    const routeChange = () =>{ 
      let path = "/MovieDetails"; 
      navigate(path);
    }
  return (
    <motion.div
            initial={{ y: 100, opacity: 0 }}   
            animate={{ y: 0, opacity: 1 }}      
            transition={{ duration: 1.5 , ease: "easeOut" }} 
            className='container'
        >

      <div>
        <h1 className="title"> {title} </h1>
        <p className="text">{overview}</p>
      </div>
      <div className="btnContainer">
      <Fab
      onClick={routeChange}
      sx={{
        borderRadius:"25px"
      }} variant="extended" size="medium" color= "">
    
        Watch Now
      </Fab>
      <Fab 
     
      size="small" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </div>
    
    </motion.div>
  );
}
