import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
