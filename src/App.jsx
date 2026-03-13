import { useState } from 'react'

import './App.css'

import { RadioGroup } from 'radix-ui'
import Home from './Pages/Home'
import NavBar from './Navbar/NavBar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ProjectDetail from './ProjectDetails/ProjectDetail'

function App() {
  const [showFilters, setShowFilters] = useState(true)

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/project/:id" element={<ProjectDetail/>}/>
      
    </Routes>

    </>
  );
}

export default App;