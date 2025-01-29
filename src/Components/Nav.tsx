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
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

function Nav() {
  const [searchbarData, setSearchbarData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    isLoggedIn,
    loggedUserId,
    isAdmin,
    authenticateUser,
    cartCount,
    fetchCart,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchbarData();
  }, []);
  useEffect(() => {
    if (loggedUserId) {
      fetchCart(loggedUserId);
    }
  }, [loggedUserId]);

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

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* main pages*/}
        <Link to={"/"}>
          <img
            src="public/Recurso-1.webp"
            style={{ width: "60px", margin: "0 20px" }}
          />
        </Link>
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
                    <IconButton>
                      <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon sx={{ color: "secondary" }} />
                      </Badge>
                    </IconButton>
                  </Link>
                  <Link to={"/profile"}>
                    <Typography>Profile</Typography>
                  </Link>
                </>
              )}
            </>
          )}
        </Box>

        {/* Searchbar +  Aut */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            {/* SearchBr */}
            <TextField
              variant="outlined"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for products..."
              sx={{ height: "60px", borderRadius: 50 }}
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
            {/* REsults */}

            <List
            disablePadding
              sx={{
                position: "absolute",
                width: "277px",
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
                  <ListItem  key={e.id} sx={{ zIndex: 3 }}>
                    <ListItemText>{e.name}</ListItemText>
                  </ListItem>
                  <Divider />
                </Link>
              ))}
            </List>
          </Box>

          {/* Auth */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "0 15px",
            }}
          >
            {!isLoggedIn && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link to={"/login"}>
                  <Button
                    variant="contained"
                    sx={{ color: "black", width: "100px" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button
                    variant="contained"
                    sx={{ color: "black", width: "100px" }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            )}
            {isLoggedIn && (
              <Button
                variant="contained"
                color="secondary.main"
                onClick={handleLogOut}
              >
                LogOut
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
