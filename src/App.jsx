import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { TvShows} from "./pages/TvShows";
import { Movies} from "./pages/movies.jsx" ;
import {SearchResult} from "./pages/SearchResult.jsx" ;
import {MovieDetails} from "./pages/MovieDetails.jsx" ;
import { PeopleDetails } from "./pages/PeopleDetails.jsx";
import{PageNotFound} from "./components/PageNotFound/PageNotFound.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement:<PageNotFound/>, 
    },
    {
      path: "/Movies",
      element: <Movies/>,
    },
    {
      path: "/TvShows",
      element: <TvShows/>,
    },
    {
      path: "/News",
      element: <News/>,
    },
    {
      path: "/SearchResult",
      element: <SearchResult/>,
    },
    {
      path: "/MovieDetails/",
      element: <MovieDetails/>,
    },
    {
      path: "/PeopleDetails",
      element: <PeopleDetails/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
