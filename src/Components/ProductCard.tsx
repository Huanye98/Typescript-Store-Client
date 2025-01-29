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
import utils from "../utils";
import { AuthContext } from "../context/auth.contex";
import { useContext } from "react";
interface ProductCardComponentProps {
  product: Product;
  addToCart: (
    productId: string,
    quantity: number,
    userId: string,
    cartId: string
  ) => void;
  loggedUserId: string;
  loggedUserCartId: string;
}

const ProductCard: React.FC<ProductCardComponentProps> = ({
  product,
  loggedUserId,
  loggedUserCartId,
}) => {
  const { id, name, imageurl, finalPrice, category, isavaliable, stock } =
    product;
 
  const {fetchCart,addToCart} = useContext(AuthContext)
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
            height="50%"
            sx={{ objectFit: "cover" }}
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
          <Typography>{parseInt(finalPrice).toFixed(2)}€</Typography>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "secondary.main" },
        }}
        onClick={() => {
          addToCart(id, 1, loggedUserId, loggedUserCartId),fetchCart();
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
