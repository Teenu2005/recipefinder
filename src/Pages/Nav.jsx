import React, { useEffect, useState } from 'react'
import { Nav, Button, Container, Form, Modal, Navbar, Card } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { CiCircleChevDown } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6"; 

function RecipeNav() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dark');
    return saved === 'true'; 
  });

  useEffect(() => {
    getapi();
  }, []);

  useEffect(() => {
    
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    localStorage.setItem('dark', dark ? 'true' : 'false');
  }, [dark]);

  async function getapi() {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      const data = await res.json();
      setItemList(data?.meals || []);
    } catch (err) {
      console.error(err);
    }
  }

  function search(e) {
    const q = e.target.value || '';
    setSearchValue(q);

    if (!q.trim()) {
      setFiltered([]);
      return;
    }

    const first = (itemList || []).filter(item =>
      item?.strMeal?.toLowerCase().includes(q.toLowerCase())
    );
    setFiltered(first.slice(0, 10));
  }

  return (
    <>
      <Navbar sticky='top' expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Recipe</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>

            <Form className="d-flex">
              <Button onClick={() => setShowSearch(true)} id='searchbutton'>
                <FaSearch /> Search
              </Button>
            </Form>

            <button onClick={() => setDark(prev => !prev)} className="them">
              {dark ? <MdSunny />:<FaMoon />}
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showSearch}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowSearch(false)}
      >
        <div 
        className='catmain'>
        <Modal.Header>
          <Button id='closesearch' onClick={() => setShowSearch(false)}><CiCircleChevDown id='downicon'/></Button>
          <input id='search' onChange={search} value={searchValue} placeholder='Search' />
        </Modal.Header>
        <Modal.Body>
          <div className="searchcont">
            <div className="row">
              {filtered.map((value, index) => (
                <div className="col-sm-3" key={value?.idMeal || index}>
                  <Card className="itemcard">
                    <Card.Img src={value?.strMealThumb} />
                    <Card.Text>{value?.strMeal}</Card.Text>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        </div>
      </Modal>
    </>
  )
}

export default RecipeNav;
