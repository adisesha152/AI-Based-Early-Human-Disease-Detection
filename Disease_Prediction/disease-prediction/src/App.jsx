import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'
import Contact from './Components/Contact'
import Upload from './Components/Upload'
import Dashboard from './Components/Dashboard'
import History from './Components/History'
import Result from './Components/Result'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="upload" element={<Upload/>} />
        <Route path="history" element={<History/>} />
        <Route path="result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
