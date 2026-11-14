import logo from "../../assets/logo.png";
import "./Nav.css";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import { SearchBox } from "../SearchBox/SearchBox";

export function Nav() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const isBelowLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter a movie, tv show, person...");
      return;
    }

    navigate(`/SearchResult/${encodeURIComponent(query)}`);

    setQuery("");
    setSearchOpen(false);
  };

  // Menu handler
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header>
        {/* Logo */}
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' className='logoheader' />
          <h1 className='logoh1'>FlickNest</h1>
        </Link>

        {/* Navigation Links */}
        <ul
          className={`list ${menuOpen && isBelowLargeScreen ? "active" : ""}`}
        >
          <li>
            <Link to='/' className='listitem'>
              Home
            </Link>
          </li>

          <li>
            <Link to='/movies' className='listitem'>
              Movies
            </Link>
          </li>

          <li>
            <Link to='/tvshows' className='listitem'>
              TV Shows
            </Link>
          </li>

          <li>
            <Link to='/news' className='listitem'>
              News
            </Link>
          </li>
        </ul>

        {/* Desktop Search */}
        <div className='search-box desktop-search'>
          <SearchBox
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            isBelowLargeScreen={false}
          />
        </div>

        {/* Mobile search icon sits beside the hamburger and hides once the field opens */}
        {isBelowLargeScreen && (
          <div className='mobile-nav-actions'>
            {searchOpen ? (
              <div className='mobile-search-dropdown'>
                <SearchBox
                  query={query}
                  setQuery={setQuery}
                  handleSearch={handleSearch}
                  isBelowLargeScreen={true}
                />
              </div>
            ) : (
              <button
                type='button'
                className='mobile-search-icon'
                aria-label='Search'
                onClick={() => setSearchOpen(true)}
              >
                <SearchIcon />
              </button>
            )}

            <div className='menu' onClick={toggleMenu}>
              {menuOpen ? (
                <CloseIcon fontSize='large' />
              ) : (
                <MenuOutlinedIcon fontSize='large' />
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
