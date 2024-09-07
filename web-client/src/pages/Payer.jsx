import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CheckOut';

const stripePromise = loadStripe('your-publishable-key');

const Payer = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
    </div>
  );
};

export default Payer;