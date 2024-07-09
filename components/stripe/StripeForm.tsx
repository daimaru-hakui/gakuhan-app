"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";

export default function StripeForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "2024制服一式",
          price: 1500, // In JPY
          currency: "jpy",
          quantity: 1,
          email:"dh.mukai.dh@gmail.com"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe Checkout session");
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("Stripe Checkout session URL not found");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Error:", err);
    //   setError(err.message); // Display error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>送信</button>
      </div>
    </form>
  );
}
