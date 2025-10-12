import { useState } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
// Components
import Nav from './Components/Nav'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Subcatogries from './Pages/Subcatogries'
import Detail from './Pages/Detail'
import About from './Pages/About'
import Footer from './Components/Footer'
import Nativedish from './Components/Nativedish'
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
        <Route path="/fav" element={<FavListProvider><FavouriteList /></FavListProvider>} />
      </Routes>
      <Footer />
</div>
    </BrowserRouter>
    </>
  )
}

export default App
