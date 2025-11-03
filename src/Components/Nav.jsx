import React, { useEffect, useState } from 'react'
import { Nav, Button, Container, Form, Modal, Navbar, Card } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { FaRegSun, FaMoon } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, NavLink } from 'react-router-dom';
import iconImg from '../assets/Icon.png'
import { fetchDatas } from '../service/Api';
import profile from '../assets/profile.png'
function RecipeNav() {
  const nav = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [itemList, setItemList] = useState([]);
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); //  track login

  // 🔹 check login status when token changes (e.g. logout/login elsewhere)
  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);



  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    localStorage.setItem('dark', dark ? 'true' : 'false');
  }, [dark]);
  useEffect(()=>{
    async function getResult(){
    if(searchValue.length > 3){
      const data = await fetchDatas(`/recipebook/recipe/Search?searchQuery=${searchValue}`);
      console.log(data.items)
      if (data && data.items) setItemList(data.items);
    }
    else{
      setItemList([]);
    }
  }
  getResult();
  },
  [searchValue])
 async function search(e) {
    const q = e.target.value ;
    setSearchValue(q);
  }

  function getitems(e) {
    const index = e.target.id;
    nav(`/item/${itemList[index]?.recipeId}`);
    setShowSearch(false);
  }

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={iconImg} width='40rem' alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink to='/' className='nav-link'>Home</NavLink>
              <NavLink to='/categories' className='nav-link'>Categories</NavLink>
              <NavLink to='/fav' className='nav-link'>Favourite</NavLink>

              
            </Nav>

            <Form className="d-flex">
              <Button onClick={() => setShowSearch(true)} id='searchbutton'>
                <FaSearch /> Search
              </Button>
            </Form>

            <button onClick={() => setDark(prev => !prev)} className="them">
              {dark ? <FaRegSun /> : <FaMoon />}
            </button>
            {/*  Dynamic Login/Profile */}
              {isLoggedIn ? (
                <>
                <NavLink to='/profile' className='nav-link'><img src={profile}  alt="Profile" /></NavLink>
                </>
              ) : (
                <NavLink to='/login' className='nav-link'>Login</NavLink>
              )}
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
        <div className='Card_Contanier'>
          <Modal.Header>
            <Button id='closesearch' onClick={() => setShowSearch(false)}>
              <IoIosArrowDown id='downicon' />
            </Button>
            <input id='search' autoFocus onChange={search} value={searchValue} placeholder='Search..' />
            <button id='search'>Search</button>
          </Modal.Header>
          <Modal.Body>
            <div className="searchcont">
              <div className="row">
                {itemList.map((value, index) => (
                  <div className="col-sm-3" key={value?.recipeId || index}>
                    <Card className="itemcard" onClick={getitems} id={index}>
                      <Card.Img src={value?.imageUrl || "https://via.placeholder.com/150"} id={index} />
                      <Card.Text id={index}>{value?.name}</Card.Text>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default RecipeNav;
