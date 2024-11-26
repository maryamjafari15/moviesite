import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import {MainSectionDetailsMovie} from "../components/DetailsMovie/MainSectionDetailsMovie/MainSectionDetailsMovie.jsx";
import { useParams } from "react-router-dom";


export function MovieDetails(){
  
    const { MovieID } = useParams();
    // console.log(MovieID);

    return(
        <div>
             <Nav/>
             
             <MainSectionDetailsMovie MovieID={MovieID}/>
            
           <Footer/>
        </div>
    )
}