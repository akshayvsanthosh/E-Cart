import React from 'react'
import Header from '../Components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import cartImage from '../assets/emptyCart.webp'
import { removeWishlistItem } from '../Redux/slices/wishlistSlice'
import { addToCart } from '../Redux/slices/cartSlice'

function Wishlist() {
  const yourWishlist = useSelector(state => state.wishlistReducer)
  const userCart = useSelector(state=>state.cartReducer)

  const dispatch = useDispatch()

  const handleCart = (product) => {
    const existingProduct = userCart?.find(item=>item.id==product.id)
    if (existingProduct) {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product?.id))
      alert("Existing Product Quantity is Incremented...")
    } else {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product?.id))
    }
  }

  return (
    <div>
      <Header/>
      <div style={{ marginTop: "100px" }} className='container-fluid '>
        {
          yourWishlist?.length > 0 ?
            <div>
              <Row className="my-5">
                {
                  yourWishlist?.map(product=>(
                    <Col key={product?.id} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                      <Card className='shadow rounded' style={{ width: '18rem' }}>
                        <Card.Img height={"180px"} variant="top" src={product?.thumbnail} />
                        <Card.Body>
                          <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                          <div className='d-flex justify-content-around mt-3'>
                            <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'><i className='fa-solid fa-heart-circle-xmark text-primary'></i></button>
                            <button onClick={()=>handleCart(product)} className='btn'><i className='fa-solid fa-cart-plus text-success'></i></button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
            :
            <div style={{ height: "70vh" }} className='d-flex align-items-center justify-content-center flex-column '>
              <img src={cartImage} alt="Image" />
              <h3 className='text-danger '>Your wishlist is empty</h3>
            </div>
        }
      </div>
    </div>
  )
}

export default Wishlist
