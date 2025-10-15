import React, { useEffect, useState } from 'react'
import { Nav, Button, Container, Form, Modal, Navbar, Card } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { FaRegSun  } from "react-icons/fa6";
import { IoIosArrowDown  } from "react-icons/io";
import { FaMoon } from "react-icons/fa6"; 
import { useNavigate, NavLink } from 'react-router-dom';
import iconImg from '../assets/Icon.png'
import { fetchData } from '../service/Api';
function RecipeNav() {
  const nav = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // dark them light them logic
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dark');
    return saved === 'true'; 
  });

  useEffect(() => {
    // async function to get the result from api using fetchData function declared in aip.js in service folder
    async function getApiResult(){
      const data = await fetchData(`filter.php?i=`)
      setItemList(data.meals);
    }
    getApiResult();
  }, []);

  useEffect(() => {
    
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    localStorage.setItem('dark', dark ? 'true' : 'false');
  }, [dark]);

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

   // navigate to detail page
 function getitems(e){
  //  console.log(itemList[e.target.id].idMeal)
    nav(`/item/${itemList[e.target.id].idMeal}`);
    setShowSearch(false)
 }
  return (
    <>
      <Navbar  expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={iconImg} width='40rem' alt="" />
            {/* Cook Book */}
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink to='/' className='nav-link'>Home</NavLink>
              <NavLink to='/categories' className='nav-link'>Categories</NavLink>
              <NavLink to='/fav' className='nav-link'>Favourite</NavLink>
            </Nav>

            <Form className="d-flex">
              {/* for open search molde */}
              <Button onClick={() => setShowSearch(true)} id='searchbutton'>
                <FaSearch /> Search
              </Button>
            </Form>

            <button onClick={() => setDark(prev => !prev)} className="them">
              {dark ? <FaRegSun  />:<FaMoon />}
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
        className='Card_Contanier'>
        <Modal.Header>
          <Button id='closesearch' onClick={() => setShowSearch(false)}><IoIosArrowDown  id='downicon'/></Button>
          <input id='search' autofocus onChange={search} value={searchValue} placeholder='Search..' /> <button id='search'>Search</button>
        </Modal.Header>
        <Modal.Body>
          <div className="searchcont">
            <div className="row">
              {filtered.map((value, index) => (
                <div className="col-sm-3" key={value?.idMeal || index}>
                  <Card className="itemcard" onClick={getitems} id={index}>
                    <Card.Img src={value?.strMealThumb}  id={index} />
                    <Card.Text  id={index}>{value?.strMeal}</Card.Text>
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
