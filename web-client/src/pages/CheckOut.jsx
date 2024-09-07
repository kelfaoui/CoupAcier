import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSearchParams } from 'react-router-dom';

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  // Récupérer le total
  const total = searchParams.get('total');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment('your-client-secret', {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess(true);
    }
  };

  return (
    <form className="lg:w-1/2 " onSubmit={handleSubmit}>
      <h2 class="text-2xl text-start bold my-5">Total : {total} €</h2>
      <CardElement />
      <button className="mt-5 w-full px-2 py-2 bg-yellow-300 text-black rounded-full text-xs font-bold uppercase hover:bg-gray-700 focus:outline-none focus:bg-gray-700" type="submit" disabled={!stripe}>
        Payer la commande
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment réussi!</div>}
    </form>
  );
};

export default CheckOut;