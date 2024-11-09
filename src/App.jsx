import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { TvShows} from "./pages/TvShows";
import { Movies} from "./pages/movies.jsx" ;
import {SearchResult} from "./pages/SearchResult.jsx" ;
import {MovieDetails} from "./pages/MovieDetails.jsx" ;
import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/movies",
      element: <Movies/>,
    },
    {
      path: "/tvshows",
      element: <TvShows/>,
    },
    {
      path: "/news",
      element: <News/>,
    },
    {
      path: "/SearchResult",
      element: <SearchResult/>,
    },
    {
      path: "/MovieDetails",
      element: <MovieDetails/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
