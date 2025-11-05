import { useState } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
// Components
import Nav from './Components/Nav'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Subcatogries from './Pages/Subcatogries'
import Detail from './Components/Detail'
import RegisterLoginForm from './Components/RegisterLoginForm'
import Footer from './Pages/Footer'
import Nativedish from './Components/Nativedish'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
// import PostRecipeForm from './Components/PostRecipeForm'
// import PutRecipeForm from './Components/PutRecipeForm'
// Context
import { FavListProvider } from './Context/FavouriteContect'
import FavouriteList from './Components/FavouriteList'
import Aihelper from './Components/Aihelper'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
       <BrowserRouter>
    <div data-theme='dark' id='dark'>
      <Nav  />
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/items/:id" element={<FavListProvider><Subcatogries /></FavListProvider>} />
        <Route path="/item/:id" element={<Detail />} />
        <Route path="/native/:place" element={<Nativedish />} />
        <Route path="/Aihelper/:id" element={<Aihelper />} />
        <Route path="/login" element={<RegisterLoginForm />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/editprofile' element={<EditProfile />}/>
        {/* <Route path='user/post' element={<PostRecipeForm />} /> */}
        {/* <Route path='user/update' element={<PutRecipeForm />} /> */}
        <Route path="/fav" element={<FavListProvider><FavouriteList /></FavListProvider>} />
      </Routes>
      <Footer />
</div>
    </BrowserRouter>
    </>
  )
}

export default App
