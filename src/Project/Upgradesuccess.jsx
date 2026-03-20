import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CheckCircledIcon } from '@radix-ui/react-icons'

const UpgradeSuccess = () => {
  const navigate = useNavigate()
  const { userSubscription } = useSelector((store) => store.subscription)

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric"
    })
  }

  return (
    <div className='min-h-screen bg-[#0e0f1f] flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>

        <div className='bg-[#131525] border border-[#252a45] rounded-2xl p-10 text-center space-y-6'>

          {/* Success icon */}
          <div className='flex justify-center'>
            <div className='w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center'>
              <CheckCircledIcon className='w-8 h-8 text-emerald-400' />
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-bold text-white mb-2'>
              Plan Upgraded Successfully!
            </h1>
            <p className='text-sm text-gray-500'>
              Your subscription is now active. Enjoy all premium features.
            </p>
          </div>

          {/* Plan details */}
          <div className='bg-[#0e0f1f] border border-[#252a45] rounded-xl p-5 text-left space-y-3'>

            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-400'>Plan Type</span>
              <span className='text-sm font-semibold text-indigo-400'>
                {userSubscription?.planType || "-"}
              </span>
            </div>

            <div className='border-t border-[#252a45]' />

            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-400'>Start Date</span>
              <span className='text-sm text-emerald-400'>
                {formatDate(userSubscription?.startDate)}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-400'>End Date</span>
              <span className='text-sm text-red-400'>
                {formatDate(userSubscription?.endDate)}
              </span>
            </div>

          </div>

          {/* Go to home */}
          <button
            onClick={() => navigate("/")}
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors'
          >
            Go to Home
          </button>

        </div>
      </div>
    </div>
  )
}

export default UpgradeSuccess