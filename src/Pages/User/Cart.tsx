import Nav from "../../Components/Nav";
import { useEffect, useState, useContext } from "react";
import service from "../../service/service.config";
import { AuthContext } from "../../context/auth.contex";
import { Link } from "react-router-dom";
import PaymentIntent from "../../Components/PaymentIntent";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Item {
  product_id: number;
  product_name: string;
  product_price: number;
  final_price: number;
  discount: number;
  quantity: number;
  imageurl: string;
}
interface UserData {
  cartPrice: number;
  user_address: string;
  user_name: string;
  cart_items: Item[];
}
interface StripeData {
  amount: number;
  products: Item[];
  userId: number;
  currency: string;
  
}
function Cart() {

  const [userData, setUserData] = useState<UserData|null>(null);
  const { loggedUserId, loggedUserCartId,addToCart,fetchCart } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [stripeData, setStripeData] = useState<StripeData|null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await service.get(`/users/${loggedUserId}`);
      const fetchedCart = response.data.response[0].cart_items;
      setCart(fetchedCart);
      setUserData(response.data.response[0]);
      console.log(response.data.response[0]);

      //stripè data set up
      const totalAmount =
        fetchedCart.reduce((acc:number, item:Item) => {
          return acc + item.final_price * item.quantity;
        }, 0) * 100;
      setStripeData({
        amount: totalAmount,
        products: fetchedCart,
        userId: response.data.response[0].user_id,
        currency: "eur",
      });
    } catch (error) {
      console.error("was not able to get user data", error);
    }
  };
  const handleAdd = async (id:number, quantity:number, userId:number, productId:number) => {
    try {
      const result = await addToCart(id, quantity, userId, productId);
      if (result.success) {
        fetchUserData();
      }
    } catch (error) {
      console.log("was not able to cart");
    }
  };
  const deleteFromCart = async (productId:number, productQuantity:number) => {
    const body = {
      product_id: productId,
      quantity: productQuantity,
      user_id: loggedUserId,
    };
    try {
      await service.delete("/users/cart/", { data: body });
      fetchUserData();
      if(loggedUserId){
        fetchCart(loggedUserId)
      }
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
    }
  };

  if (!userData) {
    return <p>Loading user data...</p>;
  }
  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <>
      <Nav />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="cart-list-container"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {cart.length > 0 ? cart.map((e:Item) => {
            return (
              <Card
                key={e.product_id}
                className="cart-card"
                sx={{ width: "90%", display: "flex", flexDirection: "row" }}
              >
                <CardMedia
                  component="img"
                  image={e.imageurl}
                  sx={{ width: "40%" }}
                />
                <CardContent sx={{display:"flex", flexDirection:"column", gap:2}}>
                  <Link to={`/store/${e.product_id}`}>
                    <p>{e.product_name}</p>
                  </Link>

                  <p>Final price: {e.final_price * e.quantity}€</p>
                  {e.quantity != 1 && <p>price per unit: {e.final_price} </p>}
                  {e.discount < 1 && (
                    <>
                      <p>Discount: {e.discount * 100}% </p>
                      <p>Original price: {e.product_price} </p>
                    </>
                  )}
                  <Box sx={{ display: "flex", gap: 1, height: "30px" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "grey", color: "black" }}
                      onClick={() => deleteFromCart(e.product_id, 1)}
                    >
                      -
                    </Button>
                    <p>Quantity: {e.quantity} </p>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "grey", color: "black" }}
                      onClick={() =>{
                        if(loggedUserId !== null && loggedUserCartId !== null){
                        handleAdd(
                          e.product_id,
                          1,
                          loggedUserId,
                          loggedUserCartId
                        )
                      }else{
                        console.error("no user id or cart id")
                      }
                      }}
                    >
                      +
                    </Button>
                  </Box>
                  <Button
                    sx={{
                      width: "200px",
                      border: "1px solid",
                      borderColor: "warning",
                    }}
                    color="warning"
                    onClick={() => deleteFromCart(e.product_id, e.quantity)}
                  >
                    Delete from cart
                  </Button>
                </CardContent>
              </Card>
            );
          }):<Typography>Your cart is empty</Typography>}
        </Box>

        <Box sx={{ backgroundColor: "white" , width:"600px", height:"400px", padding:"20px", mt:"11px"}}>

          <p>total price: {userData.cartPrice.toFixed(2)} € </p>
          <p>Address: {userData.user_address} </p>
          <p>Name: {userData.user_name}</p>
          
          <Box>
            {showPaymentIntent && stripeData ?   (
              <PaymentIntent productDetails={stripeData} />
            ) : (
              <Button variant="contained" sx={{border:"solid 3px orange"}} onClick={() => setShowPaymentIntent(true)}>
                Purchase
              </Button>
            )}
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default Cart;
