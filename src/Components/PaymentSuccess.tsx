import { useEffect, useState,useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";
import axios from "axios";
import service from "../service/service.config";
import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {loggedUserCartId,loggedUserId,fetchCart} = useContext(AuthContext)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
    fetchCart(loggedUserId)
  }, []);

  const handleUseEffect = async () => {
    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    };

    try {
      await axios.patch(
        "http://localhost:5005/api/payment/update-payment-intent",
        paymentIntentInfo
      );
      // !IMPORTANT: Adapt the request structure to the one in your project (services, .env, auth, etc...)
      emptyCart();
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const emptyCart = async ()=>{
    try {
      await service.delete(`/users/cart/${loggedUserCartId}`)
      console.log("cart emptied")
    } catch (error) {
      console.log(error)
    }
  }
  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <Container>
      <Box
        sx={{
          justifySelf: "center",
          mt: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          padding: 3,
          textAlign:"center",
          backgroundColor:"white",
          borderRadius:"25px"
        }}
      >
        <CheckCircleOutlineRoundedIcon sx={{fontSize:"3rem"}}/>
        <Typography variant="h2">Thank you for your order!</Typography>
        <Typography>Your payment has been completed </Typography>
        <Link to={"/"}>
          <Button variant="contained" sx={{color:"black", }}>Go back to Home</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
