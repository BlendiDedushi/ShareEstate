import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [cookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    };
    const requestBody = {
      reservationId: router.query.id,
      cardNumber: '4242424242424242',
      expMonth: 12,
      expYear: 2023,
      cvc: '123',
    };

    try {
      await axios.post(
        "http://localhost:8900/api/reservation/payments",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );

      // Handle the response accordingly
      setLoading(false);
      setSuccess(true);

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="w-[600px] mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      {success ? (
        <p className="text-green-500 mb-4">Payment Successful!</p>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="card-element"
            >
              Card Details
            </label>
            <div className="border border-gray-300 rounded p-2">
              <CardElement
                id="card-element"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
