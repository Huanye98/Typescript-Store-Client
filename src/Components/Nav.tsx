import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../service/service.config";
import { AuthContext } from "../context/auth.contex";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import debounce from "lodash/debounce";
import MenuIcon from "@mui/icons-material/Menu";
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
  Alert,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

interface Item {
  id: number;
  name: string;
}

function Nav() {
  const [searchbarData, setSearchbarData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(true);
    } else if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });

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
    <AppBar position="sticky" sx={{ width: "100%" }}>
      {/* alerts */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 50,
        }}
      >
        {isLoading && (
          <Alert severity="info" sx={{ zIndex: 9999 }}>
            <Typography>Loading...</Typography>
            <CircularProgress color="secondary" />
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ zIndex: 9999 }}>
            <Typography>error</Typography>
          </Alert>
        )}
      </Box>

      {/* toolbar*/}
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 1, md: 3 },
        }}
      >
        <Box>
          <Link to={"/"}>
            <img
              src="/Recurso-1.webp"
              style={{ width: "100%", margin: "0 20px", maxWidth: "40px" }}
            />
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mr: 1 }}>
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
                  <Link to={"/profile"}>
                    <Typography>Profile</Typography>
                  </Link>
                  <Link to={"/cart"}>
                    <IconButton>
                      <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon sx={{ color: "secondary" }} />
                      </Badge>
                    </IconButton>
                  </Link>
                </>
              )}
            </>
          )}
        </Box>

        {/* Searchbar +  Aut */}
        {isSmallScreen ? (
          <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            {isDrawerOpen && (
              <List
                sx={{
                  position: "absolute",
                  top: { xs: "54px", sm: "64px" },
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  boxShadow: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!isLoggedIn && (
                  <>
                    <Link to={"/login"}>
                      <ListItem>
                        <ListItemText>Login</ListItemText>
                      </ListItem>
                    </Link>
                    <Divider sx={{ width: "100%" }} />
                    <Link to={"/signup"}>
                      <ListItem>
                        <ListItemText>signup</ListItemText>
                      </ListItem>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </Button>
                )}
              </List>
            )}
          </>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* SearchBr */}
            <Box>
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
                    <ListItem key={e.id} sx={{ zIndex: 3 }}>
                      <ListItemText>{e.name}</ListItemText>
                    </ListItem>
                    <Divider />
                  </Link>
                ))}
              </List>
            </Box>

            {/* Auth */}
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "0 15px",
              }}
            >
              {!isLoggedIn && (
                <Box
                  sx={{
                    display: "flex",
                    margin: "0 15px",
                    gap: 2,
                    flexDirection: "row",
                  }}
                >
                  <Link to={"/login"}>
                    <Button
                      variant="contained"
                      sx={{ color: "black", width: "100px", padding: "5px" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button
                      variant="contained"
                      sx={{ color: "black", width: "100px", padding: "5px" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              )}
              {isLoggedIn && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogOut}
                >
                  LogOut
                </Button>
              )}
            </List>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
