import React from 'react'
import { Container, Nav,  Navbar } from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

const Header = () => {
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
    <LinkContainer to="/">
        <Navbar.Brand>ProShop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <NavbarCollapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <LinkContainer to ="/cart">
            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
            <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
        </LinkContainer>
        </Nav>
        </NavbarCollapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header