import { Nav } from "../components/Nav/Nav.jsx";
import { DiscoverMovie } from "../components/DiscoverMovie/DiscoverMovie.jsx";
import { Background } from "../components/Background/Background.jsx";
import { PopularMovie } from "../components/PopularMovie/PopularMovie.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import { TrendingMovie } from "../components/Trendingmovie/TrendingMovie.jsx";
import { LatestTrailerMovie } from "../components/LatestTrailers/LatestTrailers.jsx";
import{UpcomingMovie } from "../components/UpcomingMovie/UpcomingMovie.jsx";
import { PopularPeople } from "../components/people/People.jsx";

export function Home() {

 
  return (
    <>
      <Nav />
      <Background />

      <div
      className=" flex justify-center text-center max-w-10xl p-2.5 m-auto"
        
      >
        <DiscoverMovie />
        <TrendingMovie />
      </div>
      <PopularMovie />
      <LatestTrailerMovie />
      <UpcomingMovie />
      <PopularPeople/>
      <Footer />
    </>
  );
}
