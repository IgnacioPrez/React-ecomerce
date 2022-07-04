import React, { useContext } from "react";
import { Button } from "../components/Buttton";
import { CartContext } from "../context/Cart";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { delet, get } from "../api";
import PaymentForm from "../components/PaymentForm";

const stripe = loadStripe(
  "pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW"
);

const Carrito = () => {
  const [clientSecret, setClientSecret] = useState();
  const { items, setItems } = useContext(CartContext);

  useEffect(() => {
    get("/api/cart/pay")
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch(console.log);
  }, []);

  const eliminarProducto = (id) => {
    delet("/api/cart/remove", {
      idProduct: id,
    })
      .then((data) => {
        setItems({
          type: "UPDATE",
          payload: data,
        });
      })
      .catch(console.log);
  };
  return (
    <>
      <section className=" flex flex-row  ">
        <div className="mx-4 flex w-1/2 flex-col bg-slate-100 flex-wrap gap-5 mt-8 h-auto">
          {items.map((item) => (
            <article key={item._id} className=" flex w-auto gap-4 h-auto ">
              <section className="shadow-slate-400 shadow-lg">
                <img src={item.images[0]} alt={item.name} className="h-24" />
              </section>
              <section className=" w-72 flex items-center flex-wrap ">
                <h4>{item.name}</h4>
              </section>
              <section className=" w-12 flex items-center">
                <p>{"$" + item.price}</p>
              </section>

              <section className=" w-24 flex items-center">
                <h3>{"Cantidad: " + item.amount}</h3>
              </section>
              <section className=" w-32 h-10 text-sm flex mt-8">
                <Button
                  onClick={() => {
                    eliminarProducto(item._id);
                  }}
                >
                  Remover
                </Button>
              </section>
            </article>
          ))}
        </div>
        {clientSecret && (
          <article className="flex items-center w-1/2 h-screen">
          <section className=" w-full ">
            <Elements stripe={stripe} options={{ clientSecret }}>
              <PaymentForm />
            </Elements>
          </section>
          </article>

        )}
      </section>
    </>
  );
};

export default Carrito;
