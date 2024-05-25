import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Wishlist/>} path='/wishlist'/>
        <Route element={<Cart/>} path='/cart'/>
        <Route element={<View/>} path='/:id/view'/>
        {/* page not found */}
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
