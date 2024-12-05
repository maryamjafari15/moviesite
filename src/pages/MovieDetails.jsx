import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import {MainSectionDetailsMovie} from "../components/DetailsMovie/MainSectionDetailsMovie/MainSectionDetailsMovie.jsx";
import { useParams } from "react-router-dom";


export function MovieDetails(){
  
    const { mediaType, id  } = useParams();
    
   

    return(
        <div>
             <Nav/>
             
             <MainSectionDetailsMovie  mediaType={ mediaType}  id ={id} />
            
           <Footer/>
        </div>
    )
}