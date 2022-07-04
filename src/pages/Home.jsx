import React from 'react'
import Search from '../components/Search'
import Productos from '../components/Productos'
import { useEffect,useState } from 'react'
import { get } from '../api'

const Home = () => {
  const [productos, setProductos] = useState([])
  const [actualPage,setActualPage] = useState(1)
  
  useEffect(()=> {
    
    get(`/api/products?page=${actualPage}&limit=4`)
    .then(({data})=> {
      setProductos(data)
      console.log(actualPage)
    })
    .catch(error => console.log(error))
  },[actualPage])

  const previousPage = () => {
    return actualPage > 1 ? setActualPage(actualPage - 1) : null;

  }
  const nextPage = () => {
    setActualPage(actualPage + 1)
  }
  return (
    <>
      <div className='h-14 p-2'>
        <Search/> 
      </div>
      <main className='flex  w-full  h-full '>
      <Productos productos={productos} previousPage={previousPage} nextPage={nextPage}/>

      </main>
    </>
  )
}

export default Home