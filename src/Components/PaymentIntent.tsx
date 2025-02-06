import { useState, useEffect } from "react";
import {
  loadStripe,
  StripeElementsOptions,
  Appearance,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

interface ProductDetails {
  currency: string;
  amount: number;
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Make sure you add your publishable API key to the .env.local

function PaymentIntent({ productDetails }: { productDetails: ProductDetails }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/payment/create-payment-intent`,
      productDetails
    );

    setClientSecret(response.data.clientSecret);
  };

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
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
