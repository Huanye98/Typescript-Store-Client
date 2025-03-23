import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../Types/Types";
import { AuthContext } from "../context/auth.contex";
import { useContext } from "react";

interface ProductCardComponentProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardComponentProps> = ({ product }) => {
  const { id, name, imageurl, finalPrice, category, isavaliable, stock, discountvalue, price } =
    product;

  const { fetchCart, addToCart, loggedUserId, loggedUserCartId } =
    useContext(AuthContext);
  return (
    <Card
      className="productCard"
      sx={{
        margin: 1,
        position: "relative",
        borderRadius: "5%",
        transformOrigin: "center",
        transition: "background-color 0.5s ease",
        display: "flex",
        justifyContent: "space-between",
        willChange: "transform",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.05)",
          border: "#f3d4a8 solid 3px",
        },
      }}
    >
      <Link to={`/store/${id}`}>
        {imageurl && (
          <CardMedia
            component="img"
            image={imageurl}
            sx={{ objectFit: "cover" ,width:"100% "}}
            alt={name}
          />
        )}
        {(stock == 0 || isavaliable === false) && (
          <Chip
            label="Out of Stock"
            color="secondary"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1,
              fontWeight: "bold",
            }}
          />
        )}
        {category === "Digital goods" && (
          <Chip
            label="Digital"
            color="secondary"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1,
              fontWeight: "bold",
            }}
          />
        )}
        <CardContent
          sx={{
            height: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>{name}</Typography>
          {discountvalue > 0 && (
            <Typography
              sx={{
                color: "red",
                fontSize: "0.8rem",
              }}
            >
              <span><s>{price}€</s> {discountvalue*100}% off</span>

            </Typography>
            
          )}
          <Typography>{finalPrice.toFixed(2)}€</Typography>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "secondary.main" },
        }}
        onClick={() => {
          if (loggedUserId !== null && loggedUserCartId !== null) {
            addToCart(Number(id), 1, loggedUserId, loggedUserCartId);
            fetchCart(loggedUserId);
          } else {
            console.error("loggedUserId or loggedUserCartId is null");
          }
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
