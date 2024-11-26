import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import {NewsPage} from "../components/NewsPage/NewsPage.jsx"

export function News(){
    return(
        <div>
             <Nav/>
             <NewsPage/>
           <Footer/>
            
        </div>
    )
}