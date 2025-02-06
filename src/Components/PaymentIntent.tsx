import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions, Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import axios from "axios";

interface ProductDetails {
  currency:string;
  amount:number;
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Make sure you add your publishable API key to the .env.local
// !IMPORTANT. If using VITE, make sure you use the correct variable naming and usage (import.meta.env.VITE_VARIABLE_NAME)

function PaymentIntent({ productDetails}:{productDetails:ProductDetails}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    handleUseEffect()
  }, []);
  
  const handleUseEffect = async () => {
    //                                                        this is the product that the user is trying to purchase, sent to the backend
    //                                                                                                  |
     const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/create-payment-intent`, productDetails)
    // !IMPORTANT: Adapt the request structure to the one in your project (services, .env, auth, etc...)

    setClientSecret(response.data.clientSecret)
  }

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;