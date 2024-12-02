
import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import {SearchComponent} from "../components/SearchComponent/SearchComponent.jsx"

export function SearchResult(){
    
    return(
        <div >
           <Nav /> 
         <SearchComponent/>
      <Footer/>
        </div>
    )
}