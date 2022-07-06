import React from 'react'
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { CartContext } from '../context/Cart';
import { useState } from "react";
import Spinner from "../components/Loading";
import Modal from './Modal';

export default function PaymentForm() {
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const {setItems} = useContext(CartContext)

    const sniper = () => {
        setTimeout(() => {
            setLoading(true)
        }, 2000);
    }
    const pay = async (event)=>{
        event.preventDefault()
        const result = await stripe.confirmPayment({
            elements,
            redirect:"if_required"
        });

        console.log(result)

        if(result.paymentIntent.status==="succeeded"){
            sniper()
            navigate("/comprar");
      
            setItems ({
                type:"CLEAR"
            })
            alert('PAGO EXISTOSO!')
            await navigate('/')
        }
    }
    return (
        <>
        
    {!loading ?<div className=' bg-white flex mt-14 flex-wrap'>
            <form onSubmit={pay} className='bg-slate-200 md:w-1/2 md:mx-auto lg:w-full lg:flex lg:flex-col lg:items-center gap-4' >
                <PaymentElement id="payment-element"></PaymentElement>

               {!loading? <button onClick={sniper} className='bg-green-500 hover:bg-green-400 w-2/5 p-2 text-slate-100 text-lg lg:w-48'>Pagar</button> : <Spinner/>}
            </form>
        </div> : <Modal/>}
        </>
    )
}
