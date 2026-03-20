import { useEffect } from "react"
import "./App.css"
import Home from "./Pages/Home"
import NavBar from "./Navbar/NavBar"
import { Routes, Route, Navigate } from "react-router-dom"
import ProjectDetail from "./ProjectDetails/ProjectDetail"
import IssueDetailpage from "./Project/IssueDetailpage"
import Subscription from "./Project/Subscription"
import UpgradeSuccess from "./Project/Upgradesuccess"
import Login from "./Pages/Auth/Login"
import Signup from "./Pages/Auth/Signup"
import AcceptInvitation from "./Project/Acceptinvitation "
import LandingPage from "./Project/LandingPage"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./Redux/Auth/Action"
import { Toaster } from "sonner"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const localJwt = localStorage.getItem("jwt")
  const isLoggedIn = !!user || !!localJwt

  useEffect(() => {
    if (localJwt) dispatch(getUser())
  }, [localJwt])

  return (
    <>
      {isLoggedIn && <NavBar />}
      <Toaster theme="light" richColors position="top-right" />

      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login"   element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup"  element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/"        element={isLoggedIn ? <Home /> : <LandingPage />} />

        <Route path="/project/:id"
          element={isLoggedIn ? <ProjectDetail /> : <Navigate to="/login" replace />}
        />
        <Route path="/project/:id/issue/:issueId"
          element={isLoggedIn ? <IssueDetailpage /> : <Navigate to="/login" replace />}
        />
        <Route path="/upgrade_plan"
          element={isLoggedIn ? <Subscription /> : <Navigate to="/login" replace />}
        />
        {/* ✅ Success page after upgrade */}
        <Route path="/upgrade_plan/success"
          element={isLoggedIn ? <UpgradeSuccess /> : <Navigate to="/login" replace />}
        />
        <Route path="/accept_invitation"
          element={isLoggedIn ? <AcceptInvitation /> : <Navigate to="/login" replace />}
        />
        <Route path="/accept-invitation"
          element={isLoggedIn ? <AcceptInvitation /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App