import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useEffect, useState,} from "react";
import service from "../service/service.config";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

interface Product {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  collection_id: number;
  collection_name: string;
  description: string;
  isavaliable: boolean;
  stock: number;
  discountvalue: number;
  imageurl: string;
}
type QueryParams = {
  [key: string]: string | number | boolean;
};
function MainPage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    accessibility: true,
    lazyLoad: "ondemand" as const,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // Tablet size
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Mobile size
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const style = {
    maxWidth: "90vw",
    margin: "10px auto",
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

  useEffect(() => {
    fetchMainPageData(timeQuery, "newArrivals");
    fetchMainPageData(popularityQuery, "popularItems");
    fetchMainPageData(featuredQuery, "featuredItems");
  }, []);

  const fetchMainPageData = async (query:QueryParams, type:string) => {
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
        <Box className="landingImage" sx={{width:'100%'}}>
          <img src="/web banner.webp" alt="" style={{ width: "100%" }} />
        </Box>

        <Box className="landingScrollingText"></Box>
        <Typography> New Arrivals</Typography>
        <Box style={style}>
          <Slider {...settings} >
            {newArrivals.map((product:Product, index) => {
              return (
                <Card key={index} sx={{width:'300px !important'}}>
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
        </Box>
        <Box sx={{mt:5,}}>
          <Typography>Featured Collection</Typography>
          <img src="/web banner2.webp" alt="" style={{ width: "100%" }} />
        </Box>
        <Typography>Featured </Typography>
        <Box sx={style}>
        <Slider {...settings} >
          {featuredItems.length > 0 ? (
            featuredItems.map((product:Product, index) => {
              return (
                <Card key={index} sx={{width:'300px !important'}}>
                  <Link to={`/store/${product.id}`}>
                    <CardMedia component="img" image={product.imageurl} />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                      <Typography variant="body2">
                        Shop now <ArrowOutwardIcon />
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              );
            })
          ) : (
            <Typography> no products</Typography>
          )}
        </Slider>
          </Box>
        <Box sx={{mt:5,}} >
          <a href={"/about"}>
          About us
          <img src="/web banner3.webp" alt="" style={{ width: "100%" }} />
          </a>
        </Box>
        <Box sx={style}>
        <Typography> Hot!</Typography>
        <Slider {...settings} >
          {popularItems.map((product:Product, index) => {
            return (
              <Card key={index} sx={{width:'300px !important'}} >
                <Link to={`/store/${product.id}`}>
                  <CardMedia component="img" image={product.imageurl} />
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <Typography variant="body2">
                      Shop now <ArrowOutwardIcon />
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </Slider>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default MainPage;
