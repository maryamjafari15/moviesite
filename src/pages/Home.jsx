import { Nav } from "../components/Nav/Nav.jsx";
import { DiscoverMovie } from "../components/DiscoverMovie/DiscoverMovie.jsx";
import { Background } from "../components/Background/Background.jsx";
import { PopularMovie } from "../components/PopularMovie/PopularMovie.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import { TrendingMovie } from "../components/Trendingmovie/TrendingMovie.jsx";
import { LatestTrailerMovie } from "../components/LatestTrailers/LatestTrailers.jsx";
import{UpcomingMovie } from "../components/UpcomingMovie/UpcomingMovie.jsx";
export function Home() {
  return (
    <>
      <Nav />
      <Background />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "2000px",
          padding: "10px",
          margin: "auto",
        }}
      >
        <DiscoverMovie />
        <TrendingMovie />
      </div>
      <PopularMovie />
      <LatestTrailerMovie />
      <UpcomingMovie />
      <Footer />
    </>
  );
}
