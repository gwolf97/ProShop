import React from 'react'
import { useDispatch, useSelector} from "react-redux"
import Product from '../components/Product'
import {Row, Col} from "react-bootstrap"
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const HomeScreen = () => { 

    const params = useParams()

    const {keyword} = params
    const pageNumber = params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    React.useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])


  return (
    <>
        <h1 className='my-3'>Latest Products</h1>
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : <> <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
        </>}
    </>
  )
}

export default HomeScreen