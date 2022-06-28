import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "black",
//     },
//   },
// };

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitAsync = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
    });

    if (!error) {
      // console.log(paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });
        console.log("response", response);

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {!success ? (
        <div className="formContainer">
          <form onSubmit={handleSubmitAsync}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement />
              </div>
            </fieldset>
            <button>Pay</button>
          </form>
        </div>
      ) : (
        <div>You just bought the best coke ever!</div>
      )}
    </>
  );
};

export default PaymentForm;
