import React from 'react'
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '../Redux/slices/productSlice';

function Header({insideHome}) {
  const dispatch = useDispatch()
  const yourWishlist = useSelector(state=>state.wishlistReducer)
  const yourCart = useSelector(state=>state.cartReducer)
  return (
    <div>
      <Navbar expand="lg" className="bg-info w-100 position-fixed top-0 " style={{zIndex:"1"}}>
        <Container>
          <Navbar.Brand><Link className='fw-bolder ' to={'/'} style={{color:"#fff", textDecoration:"none"}}><i className='fa-solid fa-truck-fast pe-2'></i> FF Store </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {insideHome && <Nav.Link>
                <input onChange={e=>dispatch(searchProduct(e.target.value.toLocaleLowerCase()))} style={{width:"500px"}} type="text" className='rounded p-1 border-0 ' placeholder="Search Products Here!!"/>
              </Nav.Link>}
              <Nav.Link ><Link className='fw-bolder ' style={{color:"#fff", textDecoration:"none"}}to={'/wishlist'}><i className='fa-solid fa-heart text-danger pe-1'></i> Wishlist <Badge className='ms-1'>{yourWishlist?.length}</Badge></Link></Nav.Link>
              <Nav.Link ><Link className='fw-bolder ' style={{color:"#fff", textDecoration:"none"}}to={'/cart'}><i className='fa-solid fa-cart-plus text-success pe-1'></i> Cart <Badge className='ms-1'>{yourCart?.length}</Badge></Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
