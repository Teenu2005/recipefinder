import { useState } from 'react'
import './DarkTheam.css'
// import './App.css'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
import Types from './Pages/Types'
import Display from './Pages/Display'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Detail from './Pages/Detail'
import About from './Pages/About'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
    <div data-theme='dark'>
      <Nav />
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/categories" element={<Types />} />
        <Route path="/items/:id" element={<Display />} />
        <Route path="/item/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
      </Routes>
</div>
    </BrowserRouter>
    </>
  )
}

export default App
