import React, { useState, useEffect } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

const PaymentPage = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
    }
  };

  useEffect(() => {
    const dotElements = document.querySelectorAll('.dot');
    let currentIndex = 0;

    const interval = setInterval(() => {
      dotElements[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % dotElements.length;
      dotElements[currentIndex].classList.add('active');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="payment-page">
      <h1>Stripe Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement options={{ style: cardElementStyle }} />
        </div>
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      {paymentError && <p className="error-message">{paymentError}</p>}
      {paymentSuccess && <p className="success-message">Payment successful! Payment ID: {paymentSuccess}</p>}

      <div className="dots-container">
        <div className="dot active" style={{ backgroundColor: '#cce6ff' }}></div>
        <div className="dot" style={{ backgroundColor: '#b3d9ff' }}></div>
        <div className="dot" style={{ backgroundColor: ' #99ccff' }}></div>
        <div className="dot" style={{ backgroundColor: '#80bfff' }}></div>
        <div className="dot" style={{ backgroundColor: '#4da6ff' }}></div>
        <div className="dot" style={{ backgroundColor: ' #1a8cff' }}></div>
      </div>

      <style jsx>{`
        .payment-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          background-image: url('/background-image.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
          color: #0070f3;
          text-shadow: 8px 5px 4px rgba(0, 0, 0, 0.4);
        }

        .card-element {
          width: 550px;
          margin-bottom: 30px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 4px;
          padding: 12px;
          box-shadow: 0 9px 8px rgba(0, 0, 0, 0.1);
        }

        button {
          padding: 14px 24px;
          background-color: #0070f3;
          color: #fff;
          font-size: 18px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:disabled {
          background-color: #a0a0a0;
          cursor: not-allowed;
        }

        button:hover {
          background-color: #0059c0;
        }

        .error-message {
          color: #ff0000;
          margin-top: 10px;
          text-align: center;
        }

        .success-message {
          color: #008000;
          margin-top: 10px;
          text-align: center;
        }

        .dots-container {
          display: flex;
          justify-content: center;
          margin-top: 150px;
          gap:15px;
        }

        .dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin: 0 5px;
          transition: transform 2s ease;
        }

        .dot.active {
          transform: scale(3);
        }
      `}</style>
    </div>
  );
};

const cardElementStyle = {
  base: {
    fontSize: '16px',
    color: '#32325d',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    '::placeholder': {
      color: '#a0aec0',
    },
  },
  invalid: {
    color: '#ff0000',
  },
};

export default function PaymentPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );
}
