import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../service/service.config";
import { AuthContext } from "../context/auth.contex";
import { useNavigate } from "react-router-dom";

import debounce from "lodash/debounce";

import {
  AppBar,
  Box,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
  Button,
  Popover,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

function Nav() {
  const [searchbarData, setSearchbarData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn, loggedUserId, isAdmin, authenticateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchbarData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    authenticateUser();
    navigate("/store");
  };

  const fetchSearchbarData = async () => {
    setIsLoading(true);
    try {
      const response = await service.get("/products/all");
      setSearchbarData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFilter = debounce((query: string) => {
    const result = searchbarData.filter((e) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      debouncedFilter(query);
    } else {
      setFilteredData([]);
    }
  };

  //popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar sx={{ top: 0, backgroundColor: "primary", position: "sticky" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to={"/"}>
            <Typography>Main</Typography>
          </Link>
          <Link to={"/Store"}>
            <Typography>Store</Typography>
          </Link>
          <Link to={"/about"}>
            <Typography>About</Typography>
          </Link>
          {isLoggedIn && (
            <>
              {isAdmin && (
                <Link to={"/admin"}>
                  <Typography>Admin</Typography>
                </Link>
              )}
              {!isAdmin && (
                <>
                  <Link to={"/cart"}>
                    <Typography>Cart</Typography>
                  </Link>
                  <Link to={"/profile"}>
                    <Typography>Profile</Typography>
                  </Link>
                </>
              )}
              <Button
                variant="contained"
                color="secondary.main"
                onClick={handleLogOut}
              >
                LogOut
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to={"/login"}>
                <Typography>Login</Typography>
              </Link>
              <Link to={"/signup"}>
                <Typography>Sign Up</Typography>
              </Link>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex"}}>
          <TextField
            variant="outlined"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for products..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          <Box
            sx={{
              position: "absolute", 
              width:"277px",
              top: "100%",  
              right: 63, 
              maxHeight: 200, 
              overflowY: "auto", 
              zIndex: 9999, 
              backgroundColor: "white", 
              boxShadow: 2, 
            }}
          >
            {filteredData.slice(0, 10).map((e) => (
              <Link to={`/store/${e.id}`}>
                <Box key={e.id} sx={{ zIndex: 3 }}>
                  {e.name}
                </Box>
              </Link>
            ))}
          </Box>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
