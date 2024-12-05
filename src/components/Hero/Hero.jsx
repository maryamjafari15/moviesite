import "./Hero.css";
import Fab from "@mui/material/Fab";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./LikedButton";
import { useTheme, useMediaQuery } from "@mui/material";

export function Hero(props) {
  const { title, overview, id } = props.data;

  const navigate = useNavigate();

  const routeChange = (mediaType, title, id) => {
    let encodedTitle = encodeURIComponent(title);
    let path = `/MovieDetails/${mediaType}/${encodedTitle}/${id}}`;
    navigate(path);
  };


    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
 

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className='container3'
    >
      <div className='heroContainer'>
        <h1 className='title'> {title} </h1>
        <p className='text'>{overview ? overview : "overview not available"}</p>
      </div>
      <div className='btnContainer'>
        <Fab
          onClick={() => routeChange("movie", title, id)}
          sx={{
            borderRadius: "25px",
            padding: isMediumScreen ? "6px" : isLargeScreen ? "8px": "16px",
            fontSize: isMediumScreen ? "0.5rem" : isLargeScreen ? "0.7rem" : "1rem",
          }}
          variant='extended'
          size={isLargeScreen ? "small" : "medium"}
          color=''
        >
          Watch Now
        </Fab>
        <Fab   size={isLargeScreen ? "small" : "medium"} color='primary' aria-label='add'>
          <LikeButton />
        </Fab>
      </div>
    </motion.div>
  );
}
