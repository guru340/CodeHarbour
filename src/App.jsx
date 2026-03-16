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
import { getUser } from "./Redux/Auth/Action"  // ✅ adjust path if different

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)  // ✅ correct

  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(getUser())  // etch user on app load
    }
  }, [jwt])

  return (
    <>
      {auth.user && <NavBar />}  {/* show navbar only when user exists */}

      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={auth.user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/project/:id"
          element={auth.user ? <ProjectDetail /> : <Navigate to="/login" />}
        />

        <Route
          path="/project/:id/issue/:issueId"
          element={auth.user ? <IssueDetailpage /> : <Navigate to="/login" />}
        />

        <Route
          path="/upgrade_plan"
          element={auth.user ? <Subscription /> : <Navigate to="/login" />}
        />

      </Routes>
    </>
  )
}

export default App