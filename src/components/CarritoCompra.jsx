import React from 'react'
import {BsCartCheckFill} from 'react-icons/bs';
import { Link} from 'react-router-dom';
import BubbleAlert from './BubbleAlert';

const CarritoCompra = ({clientSecret}) => {

  return (
    <>
      <Link
      to={'/carrito'}
      >
      <BsCartCheckFill className="h-8 w-10 cursor-pointer ml-2 rounded-lg hover:bg-slate-300" />
      </Link>
      <span className='relative  right-2 top-4'>
        <BubbleAlert/>
      </span>
    </>
  )
}

export default CarritoCompra