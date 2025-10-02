import { useState } from 'react'
import './App.css'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
import Types from './Pages/Types'
import Display from './Pages/Display'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Home />
      <Types />
      <Display />
    </>
  )
}

export default App
