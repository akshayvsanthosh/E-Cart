import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../Redux/slices/wishlistSlice';
import { addToCart } from '../Redux/slices/cartSlice';

function View() {
  const [product, setProduct] = useState()
  const { id } = useParams()
  const userWishlist = useSelector(state => state.wishlistReducer)
  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  console.log(userWishlist);
  useEffect(() => {
    if (localStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(localStorage.getItem("allProducts"))
      setProduct(allProducts.find(item => item.id == id))
    }
  }, [])

  const handleWishlist = () => {
    if (userWishlist?.includes(product)) {
      alert("Item already in your wishlist")
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const handleCart = () => {
    const existingProduct = userCart?.find(item=>item.id==product.id)
    if (existingProduct) {
      dispatch(addToCart(product))
      alert("Existing Product Quantity is Incremented...")
    } else {
      dispatch(addToCart(product))
    }
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px", height: "70vh" }} className='container d-flex align-items-center'>
        <Row className='align-items-center mb-5 w-100 '>
          <Col lg={5}>
            <img className='w-100' src={product?.thumbnail} alt="Image" width={'350px'} />
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <h5>PID: {product?.id}</h5>
            <h1>{product?.title}</h1>
            <h3 className='fw-bolder text-danger '>$ {product?.price}</h3>
            <p style={{ textAlign: "justify" }}><span className='fw-bolder '>Description : </span>{product?.description}</p>
            <div className='d-flex justify-content-between mt-3'>
              <button onClick={handleWishlist} className='btn btn-outline-dark '><i className='fa-solid fa-heart text-primary'></i> Add to Wishlist </button>
              <button onClick={handleCart} className='btn btn-outline-dark '><i className='fa-solid fa-cart-plus text-success'></i> Add to Cart </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default View
