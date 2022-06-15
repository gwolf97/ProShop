import React from 'react'
import { Container, Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

const Header = () => {
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
    <Navbar.Brand href="/">ProShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <NavbarCollapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fas fa-user"></i>Sign In</Nav.Link>
        </Nav>
        </NavbarCollapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header