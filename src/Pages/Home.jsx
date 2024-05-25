import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/slices/productSlice';
import { Spinner } from 'react-bootstrap';

function Home() {
  const dispatch = useDispatch()
  const { allProducts, loading, error } = useSelector(state => state.productReducer)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div>
      <Header insideHome={true} />
      <div style={{ marginTop: "100px" }} className='container-fluid '>
        {
          loading ?
            <div className='text-center mt-5 fw-bolder '>
              <Spinner animation="border" variant="info" /> Loading...
            </div>

            :
            <Row className="my-5">
              {
                allProducts?.length > 0 ?
                  allProducts?.map(product => (
                    <Col key={product?.id} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                      <Card className='shadow rounded'>
                        <Card.Img height={"180px"} variant="top" src={product.thumbnail} />
                        <Card.Body>
                          <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                          <div className='text-center mt-3'><Link to={`/${product?.id}/view`} variant="primary">View More...</Link></div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                :
                  <div className="fw-bolder text-center mt-5 mb-5 text-danger">
                    Product Not Found!!!
                  </div>
            }
            </Row>
        }
      </div>
    </div>
  )
}

export default Home
