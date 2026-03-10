import { useState } from 'react'

import './App.css'

import { RadioGroup } from 'radix-ui'
import Home from './Pages/Home'


function App() {
  const [showFilters, setShowFilters] = useState(true)

  return (
    <>
    
     <Home/>
    </>
  );
}

export default App;