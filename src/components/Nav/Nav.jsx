import logo from "../../assets/logo.png";
import "./Nav.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import { SearchMovieRequest } from "../../data/search";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Nav() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async function getdata(e) {
    e.preventDefault();
    if (!query.trim ()){
      alert("Please enter a movie , tvshow , person...")
      return;
    } else{
    const results = await SearchMovieRequest(query);
    navigate('/SearchResult', { state: { movies: results } });}
  };

  return (
    <>
      <header>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' className='logoheader' />
          <h1 className='logoh1'> FlickNest</h1>
        </Link>

        <ul className='list'>
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
        <div className='search-box'>
          <form onSubmit={handleSearch}>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for a movie'
              variant='outlined'
              size='small'
              sx={{
                width: "300px",
                backgroundColor: "#fcfcfcc5",
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  cursor: "pointer",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                    backgroundColor: "#fcfcfc",
                    borderRadius: "15px",
                    zIndex: "-22",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  cursor: "text",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon onClick={handleSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </div>
        <div className='menu'>
          <label htmlFor='headermenu'>
            <MenuOutlinedIcon />
          </label>
        </div>
      </header>
    </>
  );
}
