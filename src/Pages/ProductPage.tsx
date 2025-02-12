import React, { useState, useEffect, useContext } from "react";
import Nav from "../Components/Nav";
import ProductUpdateForm from "../Components/Admin/ProductUpdateForm";
import ProductCard from "../Components/ProductCard";
import service from "../service/service.config";
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
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";

interface ProductPageProps {
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
  category: string;
  isFeatured: boolean;
}

function ProductPage() {
  const { isAdmin, isLoggedIn, loggedUserId, loggedUserCartId, addToCart } =
    useContext(AuthContext);
  const [productData, setProductData] = useState<ProductPageProps | null>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let { productId } = useParams();

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
    maxWidth: "90vw",
    margin: "10px auto",
  };
  useEffect(() => {
    if(!productId) return;
    fetchProductData(parseInt(productId));
    
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
  const handleAdd = async (
    productId: number,
    quantity: number,
    userId: number,
    userCartId: number
  ) => {
    try {
      await addToCart(productId, quantity, userId, userCartId);
      setSuccessMessage("Product added to cart");
      setOpenSnackbar(true);
    } catch (error) {
      console.log("was not able to add to cart", error);
    }
  };
  const fetchProductData = async (fetchId: number) => {
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
  const fetchRelatedProducts = async (relatedCategory: string) => {
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
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  if (isLoading === true || productData === null) {
    return(
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <h2>Loading product</h2>
        <CircularProgress color="secondary" />
        </Box>)
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
        <Box sx={{display:"flex", flexDirection:{xs:"column", md:"row"}}} >
          {/* Left */}
          <Box flex={1} sx={{ maxWidth: {xs:"90%", md:"50%"} , display: "flex", flexDirection:{ xs:"row",md: "column", justifyContent:"space-between"}, gap: 2}}>
            <Typography variant="h2">{productData.name}</Typography>
            <img
              src={productData.imageurl}
              alt=""
              style={{ width: "100%", maxWidth: "250px" }}
              className="product-page-img"
            />
          </Box>

          {/* Right data */}
          <Box
            flex={1}
            sx={{
              maxWidth: {xs:"100%", md:"50%"},
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {productData.collection_id && (
              <Typography variant="body1">
                Collection: {productData.collection_name}
              </Typography>
            )}
            <Typography variant="body1">
              Price: {productData.finalPrice.toFixed(2)}€
            </Typography>

            {productData.discountvalue != 0 && (
              <>
                <Typography variant="body1">
                  discount:{productData.discountvalue * 100}%
                </Typography>
                <Typography variant="body1">
                  Original price: {productData.price}€
                </Typography>
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
            {!isAdmin &&
              isLoggedIn &&
              productData.isavaliable &&
              productData.stock != 0 && (
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{ mt: 2 }}
                >
                  <TextField
                    label="Quantity"
                    type="number"
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(Number(e.target.value))
                    }
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleAdd(
                        Number(productId),
                        amount,
                        Number(loggedUserId),
                        Number(loggedUserCartId)
                      )
                    }
                    sx={{ color: "black", backgroundColor: "salmon" }}
                  >
                    Add to cart
                  </Button>
                </Box>
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
        <Box sx={style}>
          <Typography>Related products</Typography>
          <Slider {...settings}>
            {relatedProducts.map((product:ProductPageProps) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
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
                productId={Number(productId)}
                handleDelete={handleDelete}
                setSuccessMessage={setSuccessMessage}
                setOpenSnackbar={setOpenSnackbar}
              />
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity={"success"}>
                  {successMessage}
                </Alert>
              </Snackbar>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default ProductPage;
