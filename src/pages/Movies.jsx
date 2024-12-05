import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import { MoviePage} from "../components/MoviePage/MoviePage.jsx";

export function Movies(){
    return(
        <div>
           <Nav/>          
           <MoviePage/>    
           <Footer/>
        </div>
    )
}