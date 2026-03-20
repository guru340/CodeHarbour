import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { acceptInvitation } from '@/Redux/Project/Action'

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [status, setStatus] = useState("loading") // loading | success | error
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      return
    }
    // Dispatch acceptInvitation with token
    dispatch(acceptInvitation({ invitationToken: token, navigate }))
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
  }, [token])

  return (
    <div className="min-h-screen bg-[#0e0f1f] flex items-center justify-center">
      <div className="text-center space-y-4">

        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 text-sm">Accepting invitation...</p>
          </>
        )}

        {status === "success" && (
          <>
            <p className="text-emerald-400 text-xl font-semibold">✅ Invitation Accepted!</p>
            <p className="text-gray-400 text-sm">Redirecting to project...</p>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-red-400 text-xl font-semibold">❌ Invalid or expired invitation</p>
            <button
              onClick={() => navigate("/")}
              className="text-indigo-400 text-sm underline"
            >
              Go to Home
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default AcceptInvitation