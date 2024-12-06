import logo from "../../assets/logo.png";
import "./Nav.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SearchBox } from "../SearchBox/SearchBox";

export function Nav() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isBelowLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleSearch = async function getdata(e) {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a movie , tvshow , person...");
      return;
    }
    if (query.trim()) {
      navigate(`/SearchResult/${encodeURIComponent(query)}`);
      setQuery("");
    }
  };
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };


  return (
    <>
      <header>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' className='logoheader' />
          <h1 className='logoh1'> FlickNest</h1>
        </Link>

        <ul className={`list ${menuOpen && isBelowLargeScreen ? "active" : ""}`}>
          <li>
            <Link to='/' className='listitem' href=''>
              {" "}
              Home
            </Link>
          </li>
          <li>
            <Link to='/movies' className='listitem' href=''>
              Movies
            </Link>
          </li>
          <li>
            <Link to='/tvshows' className='listitem' href=''>
              TV Shows
            </Link>
          </li>
          <li>
            <Link to='/news' className='listitem' href=''>
              News
            </Link>
          </li>
        </ul>
        <div className="search-box">
          <SearchBox
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            isBelowLargeScreen={isBelowLargeScreen}
          />
        </div>
        {isBelowLargeScreen ? ( 
          <div className='menu' onClick={toggleMenu}>
            {menuOpen ? <CloseIcon fontSize="large" /> : <MenuOutlinedIcon fontSize="large" />}
          </div>
        ) : null}
      </header>
    </>
  );
}
