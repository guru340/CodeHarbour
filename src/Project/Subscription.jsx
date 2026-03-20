import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getUSerSubscription, upgradeSubscription } from '@/Redux/subscription/Action'
import { useNavigate } from 'react-router-dom'

const RAZORPAY_KEY = "rzp_test_SLvBJlBykjePz1"

const PLANS = {
  MONTHLY:  { label: "Monthly Paid Plan",  price: 799,  display: "₹799/MONTHLY",   planType: "MONTHLY" },
  ANNUALLY: { label: "Annual Paid Plan",   price: 6711, display: "₹6711/ANNUALLY",  planType: "ANNUALLY" },
}

const paidPlan = [
  "Add unlimited project", "Access to live chat", "Add unlimited team member",
  "Advanced Reporting", "Priority Support", "Customization Options",
  "Integration Support", "Advanced Security", "Training and Resources",
  "Access Control", "Custom Workflows",
]
const annualPlan = [
  "Add unlimited project", "Access to live chat", "Add unlimited team member",
  "Advanced Reporting", "Priority Support", "Everything which monthly plan has",
]
const freePlan = [
  "Add only 3 projects", "Basic Task Management", "Project Collaboration",
  "Basic Reporting", "Email Notifications", "Basic Access Control",
]

const PlanFeature = ({ text }) => (
  <div className='flex items-center gap-3'>
    <CheckCircledIcon className='text-gray-400 w-4 h-4 flex-shrink-0' />
    <span className='text-sm text-gray-300'>{text}</span>
  </div>
)

const Subscription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userSubscription, loading } = useSelector((store) => store.subscription)
  const { user } = useSelector((store) => store.auth)
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) dispatch(getUSerSubscription(jwt))
  }, [])

  //  Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (planKey) => {
    const plan = PLANS[planKey]

    //Load Razorpay SDK
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      alert("Razorpay failed to load. Check your internet connection.")
      return
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: plan.price * 100, // ✅ Razorpay takes amount in paise
      currency: "INR",
      name: "CodeHarbour",
      description: `${plan.label} Subscription`,
      image: "/logo.png",
      handler: async function (response) {
        // ✅ Payment successful — now upgrade subscription in backend
        console.log("Razorpay payment success:", response)
        try {
          await dispatch(upgradeSubscription({ plantype: plan.planType }))
          navigate("/upgrade_plan/success")
        } catch (err) {
          console.error("Subscription upgrade failed", err)
        }
      },
      prefill: {
        name: user?.fullName || "",
        email: user?.email || "",
      },
      theme: {
        color: "#4f46e5", // ✅ Indigo to match app theme
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed")
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed", (response) => {
      console.error("Payment failed:", response.error)
      alert("Payment failed: " + response.error.description)
    })
    rzp.open()
  }

  const currentPlan = userSubscription?.planType || "FREE"

  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white px-6 py-12'>

      <h1 className='text-5xl font-bold text-center mb-4'>Pricing</h1>
      <p className='text-center text-gray-400 mb-16'>
        Current Plan:{" "}
        <span className='text-indigo-400 font-semibold'>{currentPlan}</span>
      </p>

      <div className='flex flex-col lg:flex-row gap-6 justify-center items-start max-w-6xl mx-auto'>

        {/* FREE */}
        <Card className='w-full lg:w-[30%] bg-[#0f1117] border border-[#252a45] rounded-xl p-8 space-y-6'>
          <div>
            <p className='text-lg text-white mb-2'>Free</p>
            <p className='text-3xl font-bold text-white'>
              ₹0/ <span className='text-sm font-normal tracking-widest text-gray-400'>FREE</span>
            </p>
          </div>
          <Button
            variant='outline'
            disabled
            className='w-full border-[#252a45] bg-[#1e2340] text-white hover:bg-[#252a45] disabled:opacity-60'
          >
            {currentPlan === "FREE" ? "Current Plan" : "Basic"}
          </Button>
          <div className='space-y-3 pt-2'>
            {freePlan.map((item, i) => <PlanFeature key={i} text={item} />)}
          </div>
        </Card>

        {/* MONTHLY */}
        <Card className='w-full lg:w-[35%] bg-[#0f1117] border border-indigo-500/40 rounded-xl p-8 space-y-6 relative shadow-lg shadow-indigo-500/10'>
          <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium'>
            Most Popular
          </div>
          <div>
            <p className='text-lg text-white mb-2'>Monthly Paid Plan</p>
            <p className='text-3xl font-bold text-white'>
              ₹799/ <span className='text-sm font-normal tracking-widest text-gray-400'>MONTHLY</span>
            </p>
          </div>
          <Button
            onClick={() => handlePayment("MONTHLY")}
            disabled={loading || currentPlan === "MONTHLY"}
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50'
          >
            {loading ? "Processing..." : currentPlan === "MONTHLY" ? "Current Plan" : "Pay ₹799"}
          </Button>
          <div className='space-y-3 pt-2'>
            {paidPlan.map((item, i) => <PlanFeature key={i} text={item} />)}
          </div>
        </Card>

        {/* ANNUAL */}
        <Card className='w-full lg:w-[30%] bg-[#0f1117] border border-[#252a45] rounded-xl p-8 space-y-6'>
          <div>
            <p className='text-lg text-white mb-2'>Annual Paid Plan</p>
            <p className='text-3xl font-bold text-white'>
              ₹6711/ <span className='text-sm font-normal tracking-widest text-gray-400'>ANNUALLY</span>
            </p>
            <p className='text-sm text-emerald-400 mt-1'>Save 30%</p>
          </div>
          <Button
            onClick={() => handlePayment("ANNUALLY")}
            disabled={loading || currentPlan === "ANNUALLY"}
            className='w-full bg-white text-black hover:bg-gray-200 font-semibold disabled:opacity-50'
          >
            {loading ? "Processing..." : currentPlan === "ANNUALLY" ? "Current Plan" : "Pay ₹6711"}
          </Button>
          <div className='space-y-3 pt-2'>
            {annualPlan.map((item, i) => <PlanFeature key={i} text={item} />)}
          </div>
        </Card>

      </div>
    </div>
  )
}

export default Subscription