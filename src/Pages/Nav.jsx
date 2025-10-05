import React, { useEffect, useState } from 'react'
import {Nav,Button,Container,Form,Modal, Navbar, Card} from 'react-bootstrap'
function RecipeNav() {
  const [showSearch,setShowSearch] = useState(false);
  const [searchValue,setSearchValue] = useState('');
  const [itemList,setItemList] = useState([]);
  const [filtered,setFiltered] = useState([]);
  useEffect(() => {
      getapi();
    }, []);
  
    async function getapi() {
      try {
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
          .then(res => res.json())
          .then(data => setItemList(data.meals));
      } catch (err) {
        console.log(err);
      }
    }
  function search(e){
    setSearchValue(e.target.value);
    let first = itemList.filter(
      (item)=>{
       return item.strMeal.toLowerCase().includes(searchValue.toLowerCase())
      }
    )
    setFiltered(first.slice(0,10))
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
            <Button onClick={()=>setShowSearch(true)} id='searchbutton'><span className="material-symbols-outlined">search</span>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showSearch?    <Modal
      show = {showSearch}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Button id='closesearch' onClick={()=>setShowSearch(false)}><span class="material-symbols-outlined">
stat_minus_2
</span></Button>
        <input id='search' onChange={search} value={searchValue} placeholder='Search'/>
      </Modal.Header>
      <Modal.Body>
        <div className="searchcont">
          <div className="row">
       {filtered.map((value, index) => (
        <div className="col-sm-3">
            <Card className="itemcard" id={index}>
              <Card.Img id={index} src={value.strMealThumb} />
              <Card.Text id={index}>{value.strMeal}</Card.Text>
            </Card>
            </div>
        ))}
        </div>
        </div>
      </Modal.Body>
    </Modal>:null}
    </>
  )
}

export default RecipeNav