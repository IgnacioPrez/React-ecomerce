import PaymentForm from "../components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { get } from "../api";

const stripe = loadStripe(
  "pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW"
);
const Comprar = () => {
  const [clientSecret, setClientSecret] = useState();
  useEffect(() => {
    get("/api/cart/pay")
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(console.log);
  }, []);

  return (
    <div className=" w-full bg-slate-200">
      {clientSecret && (
        <article className="h-full mt-auto ">
          <section className=" w-full ">
            <Elements stripe={stripe} options={{ clientSecret }}>
              <PaymentForm />
            </Elements>
          </section>
        </article>
      )}
    </div>
  );
};

export default Comprar;
