import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Form, Button, Image} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {

    // <Form.File id="image-file" label="Choose File"  onChange={uploadFileHandler}/>

    const [price, setPrice] = React.useState(0)
    const [name, setName] = React.useState("")
    const [image, setImage] = React.useState("")
    const [brand, setBrand] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [countInStock, setCountInStock] = React.useState(0)
    const [description, setDescription] = React.useState("")
    const [uploading, setUploading] = React.useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    console.log(params.id)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate("/admin/productlist")
        }else{
            if(!product.name || product._id !== params.id){
                dispatch(listProductDetails(params.id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    },[dispatch, params.id, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({_id: params.id, name, price, image, category, brand, countInStock, description}))
    }

    const uploadFileHandler = async(e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }

            const {data} = await axios.post("/api/upload", formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
            setImage("")
        }
    }

  return (
    <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="name" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type="number" 
                        placeholder="Enter price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Image src={image} fluid></Image>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter image url" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.Group onChange={uploadFileHandler} controlId="image-file" className="mb-3">
                            <Form.Label>Choose Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        {uploading && <Loader/>}
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter brand" 
                        value={brand} 
                        onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                        type="number" 
                        placeholder="Enter count in stock" 
                        value={countInStock} 
                        onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

        
                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
        )}

    </FormContainer>
    </>
  )
}

export default ProductEditScreen