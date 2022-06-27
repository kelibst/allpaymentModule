import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const stripeTestPromise = loadStripe(
  process?.env?.PUBLIC_KEY ||
    "pk_test_51LE4n9BfulhkqIv1SEAEgGi0fnNCP2fwqtCZdqyTCZ0cnfz662RQZxSqJ1vuZYUufNnBNKobNTXLU0qRsLat7vpS00bRKS5Pvw"
);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
