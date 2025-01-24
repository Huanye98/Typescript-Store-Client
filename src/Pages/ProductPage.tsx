import React, { useState, useEffect, useContext } from "react";
import Nav from "../Components/Nav";
import ProductUpdateForm from "../Components/Admin/ProductUpdateForm";
import ProductCard from "../Components/ProductCard";
import service from "../service/service.config";
import utils from "../utils";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Divider,
} from "@mui/material";

interface Product {
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

function ProductPage() {
  const { addToCart } = utils;
  const { isAdmin, isLoggedIn, loggedUserId, loggedUserCartId } =
    useContext(AuthContext);
  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const style = {
    maxWidth: "100vw",
    margin: "10px auto",
    border: "1px solid red",
  };
  useEffect(() => {
    console.log(productId);
    if (productId) {
      fetchProductData(productId);

      console.log(productId);
    }
  }, [productId]);



  const deleteProduct = async () => {
    if (!productId) {
      console.error("product id is missing");
      return;
    }
    try {
      console.log("Deleting product with ID:", productId);
      await service.delete(`/products/${productId}`);
      console.log("product deleted");
      navigate("/store");
    } catch (error) {
      console.log("Was not able to delete product", error);
    }
  };
  const handleDelete = () => {
    const userConfirmed = window.confirm(
      "are you sure you want to delete this product"
    );
    if (userConfirmed) {
      deleteProduct();
    } else {
      alert("action canceled");
    }
  };
  const handleAdd = async (productId, quantity, userId, userCartId) => {
    try {
      const response = await addToCart(productId, quantity, userId, userCartId);
      if (response.success) {
        navigate("/store");
      }
    } catch (error) {
      console.log("was not able to add to cart", error);
    }
  };
  const fetchProductData = async (fetchId: string) => {
    try {
      const filters = { id: fetchId };
      const response = await service.get("/products/", { params: filters });
      setProductData(response.data.products[0]);
      console.log(response);
      fetchRelatedProducts(response.data.products[0].category);
      setIsLoading(false);
    } catch (error) {
      console.error("problem fetching product", error);
      setError("there was an issue loading the product");
      setIsLoading(false);
    }
  };

  
  const fetchRelatedProducts = async (relatedCategory) => {
    try {
      const response = await service.get("/products", {
        params: { category: relatedCategory, limit: 6 },
      });
      setRelatedProducts(response.data.products);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading === true || productData === null) {
    return <p>Loading product....</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  if (!productData) {
    return <p> product not found</p>;
  }
  return (
    <>
      <Nav />
      <Container>
        <Box display={"flex"} gap={5}>
          {/* Left */}
          <Box flex={1} sx={{ maxWidth: "50%" }}>
            <Typography variant="h2">{productData.name}</Typography>
            <img
              src={productData.imageurl}
              alt=""
              style={{ width: "100%" }}
              className="product-page-img"
            />
          </Box>

          {/* Right data */}
          <Box flex={1} sx={{ maxWidth: "50%", mt: "70px" }}>
            {productData.collection_id && (
              <Typography variant="body1">
                Collection: {productData.collection_name}
              </Typography>
            )}
            <Typography variant="body1">
              Price: {productData.finalPrice.toFixed(2)}€
            </Typography>

            {productData.discountvalue != 1 && (
              <>
                <Typography variant="body1">
                  discount:{productData.discountvalue * 100}%
                </Typography>
                <Typography variant="body1">
                  Original price: {productData.price}€
                </Typography>
                ww
              </>
            )}

            <Typography variant="body1">
              Description: {productData.description}
            </Typography>
            {(!productData.isavaliable || productData.stock <= 0) && (
              <Typography variant="body1" color="error">
                Sorry product not avaliable at the moment!
              </Typography>
            )}
            {/* Add to cart */}
            {!isAdmin && isLoggedIn && productData.isavaliable && (
              <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>
            )}
            {isLoggedIn && productData.isavaliable && (
              <Button
                variant="outlined"
                onClick={() =>
                  handleAdd(productId, amount, loggedUserId, loggedUserCartId)
                }
                sx={{ color: "black", backgroundColor: "salmon" }}
              >
                Add to cart
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{ color: "black", backgroundColor: "secondary.main" }}
              >
                Add to cart
              </Button>
            )}
          </Box>
        </Box>
        <Divider sx={{ margin: "30px 0" }} />
        {/* Related products */}
        <Box>
          <Typography>Related products</Typography>
          <Slider {...settings} style={style}>
            {relatedProducts
              
              .map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addtoCart={addToCart}
                    loggedUserCartId={loggedUserCartId}
                    loggedUserId={loggedUserId}
                  />
                );
              })}
          </Slider>
        </Box>
        {/* Admin update product form */}
        <Box>
          {isAdmin && isLoggedIn && (
            <>
              <Divider sx={{ margin: "30px 0" }} />
              <ProductUpdateForm
                productId={productId}
                handleDelete={handleDelete}
              />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default ProductPage;
