import { useEffect, useState } from "react";
import "./People.css";
import { Error } from "../ErrorComponent/ErrorComponent";
import { PopularPeopleRequest } from "../../data/main";
import { useNavigate } from "react-router-dom";

export function PopularPeople() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const navigate = useNavigate();
  const routeChange = (starname , movieId) => {
    let path = `/PeopleDetails/${starname}/${movieId}` ;
    navigate(path);}

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const people = await PopularPeopleRequest();
        setData(people);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getdata();
  }, []);
  return (
    <>
    <h1 className="text-4xl mt-11 text-center"> Popular People</h1>
    <div className='people-con'>    
      {loading ? <div> loading...</div> : null}
      {error ? <Error /> : null}
      {data?.filter((people) => people.profile_path).map((people) => (
        <div className="actor-card" key={people.id}>
          <img
          onClick={()=> routeChange(people.name , people.id)}
            className='profilepeople'
            src={`https://image.tmdb.org/t/p/w500${people.profile_path}`}
            alt={people.name}
          />
          <h3>{people.name} </h3>
          
        </div>
      ))}
    </div>
    </>
  );
}
