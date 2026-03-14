import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import NavBar from './Navbar/NavBar'
import { Routes, Route } from 'react-router-dom'
import ProjectDetail from './ProjectDetails/ProjectDetail'
import IssueDetailpage from './Project/IssueDetailpage'
import Subscription from './Project/Subscription'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn ? (
        // ✅ Logged in — show navbar + app routes
        <div>
          <NavBar onLogout={() => setIsLoggedIn(false)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/project/:id/issue/:issueId" element={<IssueDetailpage />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
          </Routes>
        </div>
      ) : (
        // ✅ Not logged in — show auth routes only
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
      )}
    </>
  )
}

export default App