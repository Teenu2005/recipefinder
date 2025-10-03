import React, { useState } from 'react'
import {Nav,Button,Container,Form,NavDropdown, Navbar,NavbarBrand, NavbarCollapse} from 'react-bootstrap'
function RecipeNav() {
  const [inp,setInp] = useState();
  const [country, setCountry] = useState([]);
  
  function search(e){
    setInp(e.traget.value);
  }
  return (
    <>
       <Navbar sticky='top' expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#" className=''>Recipe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={search}
              value={inp}
            />
            <Button className='btnSearch'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default RecipeNav