import { useState } from 'react'
import './App.css'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
import Types from './Pages/Types'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Home />
      <Types />
    </>
  )
}

export default App
