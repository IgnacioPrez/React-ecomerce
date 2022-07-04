import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SigIn from './pages/SigIn'
import NotFound from "./pages/NotFound"
import Navbar from './components/Navbar'
import { useContext, useEffect } from "react"
import { get } from "./api"
import { authContext } from "./context/Auth"
import { CartContext } from "./context/Cart"
import Carrito from "./pages/Carrito"

const App = () => {
  const {setUser} = useContext(authContext)
  const {setItems} =useContext(CartContext)

  useEffect(()=> {
    get('/api/auth/validate')
    .then(result => {
      setUser({type:'LOGIN',payload:result.user})
      get('/api/cart')
      .then(data => {
        setItems({
          type:'UPDATE',
          payload:data
        })
      })
      .catch(error => console.log)
    })

    .catch(error => console.log(error))
  },[setUser,setItems])


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/acceso' element={<Login/>}/>
      <Route path='/crear' element={<SigIn/>}/>
      <Route path='/carrito' element={<Carrito/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  )
}

export default App