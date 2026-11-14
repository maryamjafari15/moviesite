import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBox({
  query,
  setQuery,
  handleSearch,
  isBelowLargeScreen,
}) {
  return (
    <form onSubmit={handleSearch}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for a movie, tv show'
        variant='outlined'
        size='small'
        sx={{
          width: isBelowLargeScreen ? "min(210px, 46vw)" : "300px",
          backgroundColor: "#fcfcfcc5",
          borderRadius: "15px",

          "& .MuiOutlinedInput-root": {
            height: isBelowLargeScreen ? "34px" : "40px",
            padding: 0,
            borderRadius: "15px",

            "& fieldset": {
              borderColor: "transparent",
            },

            "&:hover fieldset": {
              borderColor: "transparent",
            },

            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },

          "& .MuiOutlinedInput-input": {
            padding: isBelowLargeScreen ? "5px 4px" : "8px 10px",
            fontSize: isBelowLargeScreen ? "10px" : "14px",
            lineHeight: 1.2,
          },

          "& .MuiInputAdornment-root": {
            marginRight: isBelowLargeScreen ? "2px" : "8px",
            marginLeft: isBelowLargeScreen ? "4px" : "8px",
          },

          "& .MuiSvgIcon-root": {
            fontSize: isBelowLargeScreen ? "17px" : "22px",
            cursor: "pointer",
          },

          "& input::placeholder": {
            fontSize: isBelowLargeScreen ? "9px" : "14px",
            opacity: 0.8,
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
  );
}
