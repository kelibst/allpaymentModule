import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Axios } from "axios";
import React, { FormEventHandler, useState } from "react";

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitAsync = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
    });

    if (error) {
      try {
        const { id } = paymentMethod;
        const response = await Axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <div>
          <form onSubmit={handleSubmitAsync}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
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
