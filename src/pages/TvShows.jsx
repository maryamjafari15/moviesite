import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import { TvShowPage } from "../components/TvShowPage/TvShowPage.jsx";

export function TvShows(){
    return(
        <div>
        <Nav/>
        <TvShowPage/>
        <Footer/>
        </div>
    )
}