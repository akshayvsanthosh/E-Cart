import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import cartImage from '../assets/emptyCart.webp'
import {decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../Redux/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'


function Cart() {
  const yourCart = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    if(yourCart?.length>0){
      setCartTotal(yourCart?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
    }else{
      setCartTotal(0)
    }
  })

  const handleDecrement = (product) =>{
    if (product.quantity>1) {
      dispatch(decrementQuantity(product.id))
    } else {
      dispatch(removeCartItem(product.id))
    }
  }

  const checkout = ()=>{
    dispatch(emptyCart())
    alert("Order placed successfully. Thank you for purchasing with us!!")
    navigate('/')
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className='container '>

        {
          yourCart?.length > 0 ?
            <div className='cart'>
              <h1>Cart Summary</h1>
              <div className="row mt-4">
                <div className="col-lg-8">
                  <table className="table shadow">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        yourCart?.map((product,index) => (
                          <tr key={product.id}>
                            <td>{index+1}</td>
                            <td>{product?.title.slice(0,10)}...</td>
                            <td><img width={'50px'} height={'50px'} src={product?.thumbnail} alt="image" /></td>
                            <td>
                              <div className="d-flex">
                                <button onClick={()=>handleDecrement(product)} className='btn fw-bolder '>-</button>
                                <input style={{ width: "50px" }} className='fw-bolder me-1 ms-1 text-center ' value={product?.quantity} type="text" readOnly />
                                <button onClick={()=>dispatch(incrementQuantity(product?.id))} className='btn fw-bolder '>+</button>
                              </div>
                            </td>
                            <td>$ {product?.totalPrice}</td>
                            <td>
                              <button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <div className='float-end'>
                    <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-2'>EMPTY CART</button>
                    <Link to={'/'} className='btn btn-info '>SHOP MORE</Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className='rounded shadow  border p-3'>
                    <h4>Total Amount : <span className='text-danger'>$ {cartTotal}</span></h4>
                    <hr />
                    <div className='d-grid '>
                      <button className='btn btn-success' onClick={checkout}>Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div style={{ height: "70vh" }} className='d-flex align-items-center justify-content-center flex-column '>
              <img src={cartImage} alt="Image" />
              <h3 className='text-danger '>Your Cart is empty</h3>
            </div>
        }

      </div>
    </>
  )
}

export default Cart
