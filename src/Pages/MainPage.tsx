import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useEffect, useState, useContext } from "react";
import service from "../service/service.config";
import ProductCard from "../Components/ProductCard";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import utils from "../utils";
import { AuthContext } from "../context/auth.contex";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function MainPage() {
  const { loggedUserId, loggedUserCartId } = useContext(AuthContext);
  const [newArrivals, setNewArrivals] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const { addToCart } = utils;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const timeQuery = {
    created_at: "desc",
    limit: 5,
  };
  const popularityQuery = {
    items_sold: "desc",
    limit: 5,
  };
  const featuredQuery = {
    is_featured: true,
    limit: 5,
  };

  const style = {
    maxWidth: "100vw",
    margin: "0 auto",
    border: "1px solid red",
  };

  useEffect(() => {
    fetchMainPageData(timeQuery, "newArrivals");
    fetchMainPageData(popularityQuery, "popularItems");
    fetchMainPageData(featuredQuery, "featuredItems");
  }, []);

  const fetchMainPageData = async (query, type) => {
    try {
      const response = await service.get("/products", { params: query });
      if (type === "newArrivals") {
        setNewArrivals(response.data.products);
      } else if (type === "popularItems") {
        setPopularItems(response.data.products);
      } else if (type === "featuredItems") {
        setFeaturedItems(response.data.products);
      }
      console.log(response.data);
    } catch (error) {}
  };
  if (!newArrivals.length || !popularItems.length || !featuredItems.length) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Nav />
      <Box>
        <Box className="landingImage">
          <img src="Sin título-1.png" alt="" style={{ width: "100vw" }} />
        </Box>

        <Box className="landingScrollingText"></Box>
        <Typography> newArrivals</Typography>
        <Slider {...settings} style={style}>
          {newArrivals.map((product, index) => {
            return (
              <Card key={index}>
                <Link to={`/store/${product.id}`}>
                  <CardMedia component="img" image={product.imageurl} />
                </Link>
                <CardContent>
                  <Link to={`/store/${product.id}`}>
                    <Typography>{product.name}</Typography>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </Slider>
        <Box
          className="LandingfeaturedCollection"
          sx={{ border: "1px solid blue" }}
        >
          featuredCollection
          <img src="Sin título-1.png" alt="" style={{ width: "100vw" }} />
        </Box>
        <Typography>Featured </Typography>
        <Slider {...settings} style={style}>
          {featuredItems.length > 0 ? (
            featuredItems.map((product, index) => {
              return (
                <Link to={`/store/${product.id}`}>
                  <Card key={index}>
                    <CardMedia component="img" image={product.imageurl} />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                      <Typography variant="body2">
                        Shop now <ArrowOutwardIcon />
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          ) : (
            <Typography> no products</Typography>
          )}
        </Slider>

        <Box className="landingAbout" sx={{ border: "1px solid blue" }}>
          Abouot
          <img src="Sin título-1.png" alt="" style={{ width: "100vw" }} />
        </Box>
        <Typography> Hot!</Typography>
        <Slider {...settings} style={style}>
          {popularItems.map((product, index) => {
            return (
              <Link to={`/store/${product.id}`}>
                <Card key={index}>
                  <CardMedia component="img" image={product.imageurl} />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <Typography variant="body2">
                      Shop now <ArrowOutwardIcon />
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Slider>
      </Box>
      <Footer />
    </>
  );
}

export default MainPage;
