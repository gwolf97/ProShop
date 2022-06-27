import React, { useEffect } from 'react'
import {Link, useLocation, useParams } from "react-router-dom"
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap"
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message"

const CartScreen = () => {
    const {id} = useParams()
    const {search} = useLocation()
    const qty = search ? Number(search.split("=")[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id, qty))
        }
    },[dispatch, id, qty])


  return (
    <div>cartScreen</div>
  )
}

export default CartScreen