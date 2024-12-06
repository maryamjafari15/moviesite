
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBox({ query, setQuery, handleSearch, isBelowLargeScreen }) {
  return (
    <form onSubmit={handleSearch}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie, tv show"
        variant="outlined"
        size="small"
        sx={{
          width: isBelowLargeScreen ? "280px" : "300px",
          fontSize: isBelowLargeScreen ? "8px" : "14px",
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
            <InputAdornment position="start">
              <SearchIcon onClick={handleSearch} />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
