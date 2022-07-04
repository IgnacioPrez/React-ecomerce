import React from 'react'
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { CartContext } from '../context/Cart';

export default function PaymentForm() {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const {setItems} = useContext(CartContext)

    const pay = async (event)=>{
        event.preventDefault()
        const result = await stripe.confirmPayment({
            elements,
            redirect:"if_required"
        });

        console.log(result)

        if(result.paymentIntent.status==="succeeded"){
            setItems ({
                type:"CLEAR"
            })
            alert('PAGO EXISTOSO!')
            await navigate('/')
        }
    }
    return (
        <div>
            <form onSubmit={pay} >
                <PaymentElement id="payment-element"></PaymentElement>
                <button className='bg-green-500 hover:bg-green-400 w-2/5 p-2 text-slate-100 text-lg'>Pagar</button>
            </form>
        </div>
    )
}
