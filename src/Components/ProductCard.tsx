import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../Types/Types";
import utils from "../utils";

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
  const { id, name, imageurl, finalPrice } = product;
  const { addToCart } = utils;
  return (
    <Card
      className="productCard"
      sx={{
        margin: 1,
        position: "relative",
        borderRadius: "5%",
        transformOrigin: "center",
        transition: "background-color 0.5s ease",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
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
            height="140"
            sx={{ objectFit: "cover" }}
            alt={name}
          />
        )}
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{finalPrice}</Typography>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        fullWidth
        sx={{
          "&:hover": { backgroundColor: "secondary.main" },
        }}
        onClick={() => {
          addToCart(id, 1, loggedUserId, loggedUserCartId);
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
