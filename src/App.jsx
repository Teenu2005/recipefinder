import { useState } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
// Components
import Nav from './Components/Common/Nav'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Subcatogries from './Pages/Subcatogries'
import Detail from './Components/Recipes/Detail'
import RegisterLoginForm from './Components/User/RegisterLoginForm'
import Footer from './Pages/Footer'
import Nativedish from './Components/Recipes/Nativedish'
import Profile from './Pages/Profile'
import EditProfile from './Components/User/EditProfile'
// import PostRecipeForm from './Components/PostRecipeForm'
// import PutRecipeForm from './Components/PutRecipeForm'
import FavouriteList from './Components/User/FavouriteList'
import Aihelper from './Components/Recipes/Aihelper'

function App() {

  return (
    <>
       <BrowserRouter>
    <div data-theme='dark' id='dark'>
      <Nav  />
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/items/:id" element={<Subcatogries />} />
        <Route path="/item/:id" element={<Detail />} />
        <Route path="/native/:place" element={<Nativedish />} />
        <Route path="/Aihelper/:id" element={<Aihelper />} />
        <Route path="/login" element={<RegisterLoginForm />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/editprofile/:id' element={<EditProfile />}/>
        {/* <Route path='user/post' element={<PostRecipeForm />} /> */}
        {/* <Route path='user/update' element={<PutRecipeForm />} /> */}
        <Route path="/fav" element={<FavouriteList />} />
      </Routes>
      <Footer />
</div>
    </BrowserRouter>
    </>
  )
}

export default App
