import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import {ActorProfile} from "../components/ActorProfile/ActorProfile.jsx";
import { useParams } from "react-router-dom";

export function PeopleDetails(){
    const { peopleID } = useParams();
    return (
        <div>
             <Nav/>
             <ActorProfile peopleID= {peopleID}/>
           <Footer/>
        </div>
    )
}