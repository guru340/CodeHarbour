import React, { useEffect } from "react"
import Project from "../ProjectList/Project"
import { toast } from "sonner"
import { useSelector } from "react-redux"

const Home = () => {

  const auth = useSelector(store => store.auth)
  

  useEffect(() => {
    if (auth.user) {
        
      toast.success(`Welcome back, ${auth.user.fullName}! 🎉`)
    }
  }, [auth.user])  // ✅ fires when auth.user is set

  return (
    <>
      <Project />
    </>
  )
}

export default Home