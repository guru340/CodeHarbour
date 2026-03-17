import { useEffect } from "react"
import "./App.css"
import Home from "./Pages/Home"
import NavBar from "./Navbar/NavBar"
import { Routes, Route, Navigate } from "react-router-dom"
import ProjectDetail from "./ProjectDetails/ProjectDetail"
import IssueDetailpage from "./Project/IssueDetailpage"
import Subscription from "./Project/Subscription"
import Login from "./Pages/Auth/Login"
import Signup from "./Pages/Auth/Signup"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./Redux/Auth/Action"
import { Toaster } from "sonner"

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(getUser())
    }
  }, [jwt])

  return (
    <>
      {jwt && <NavBar />}
      <Toaster theme="dark" richColors position="top-right" />

      <Routes>
        <Route path="/login" element={!jwt ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!jwt ? <Signup /> : <Navigate to="/" />} />
        <Route path="/" element={jwt ? <Home /> : <Navigate to="/login" />} />
        <Route path="/project/:id" element={jwt ? <ProjectDetail /> : <Navigate to="/login" />} />
        <Route path="/project/:id/issue/:issueId" element={jwt ? <IssueDetailpage /> : <Navigate to="/login" />} />
        <Route path="/upgrade_plan" element={jwt ? <Subscription /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App