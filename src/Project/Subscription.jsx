import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircledIcon } from '@radix-ui/react-icons'

const paidPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Customization Options",
  "Integration Support",
  "Advanced Security",
  "Training and Resources",
  "Access Control",
  "Custom Workflows",
]

const annualPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Everything which montly plan has",
]

const freePlan = [
  "Add only 3 projects",
  "Basic Task Management",
  "Project Collaboration",
  "Basic Reporting",
  "Email Notifications",
  "Basic Access Control",
]

const PlanFeature = ({ text }) => (
  <div className='flex items-center gap-3'>
    <CheckCircledIcon className='text-gray-400 w-4 h-4 flex-shrink-0' />
    <span className='text-sm text-gray-300'>{text}</span>
  </div>
)

const Subscription = () => {
  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white px-6 py-12'>

      {/* Heading */}
      <h1 className='text-5xl font-bold text-center mb-16'>Pricing</h1>

      {/* Plans Grid */}
      <div className='flex flex-col lg:flex-row gap-6 justify-center items-start max-w-6xl mx-auto'>

        {/* FREE PLAN */}
        <Card className='w-full lg:w-[30%] bg-[#0f1117] border border-[#252a45] rounded-xl p-8 space-y-6'>
          <div>
            <p className='text-lg text-white mb-2'>Free</p>
            <p className='text-3xl font-bold text-white'>
              ₹0/ <span className='text-sm font-normal tracking-widest text-gray-400'>FREE</span>
            </p>
          </div>

          <Button
            variant='outline'
            className='w-full border-[#252a45] bg-[#1e2340] text-white hover:bg-[#252a45]'
          >
            Get Started
          </Button>

          <div className='space-y-3 pt-2'>
            {freePlan.map((item, i) => (
              <PlanFeature key={i} text={item} />
            ))}
          </div>
        </Card>

        {/* MONTHLY PAID PLAN */}
        <Card className='w-full lg:w-[35%] bg-[#0f1117] border border-[#252a45] rounded-xl p-8 space-y-6'>
          <div>
            <p className='text-lg text-white mb-2'>Monthly Paid Plan</p>
            <p className='text-3xl font-bold text-white'>
              ₹799/ <span className='text-sm font-normal tracking-widest text-gray-400'>MONTHLY</span>
            </p>
          </div>

          <Button
            className='w-full bg-white text-black hover:bg-gray-200 font-semibold'
          >
            Current Plan
          </Button>

          <div className='space-y-3 pt-2'>
            {paidPlan.map((item, i) => (
              <PlanFeature key={i} text={item} />
            ))}
          </div>
        </Card>

        {/* ANNUAL PAID PLAN */}
        <Card className='w-full lg:w-[30%] bg-[#0f1117] border border-[#252a45] rounded-xl p-8 space-y-6'>
          <div>
            <p className='text-lg text-white mb-2'>Annual Paid Plan</p>
            <p className='text-3xl font-bold text-white'>
              ₹6711/ <span className='text-sm font-normal tracking-widest text-gray-400'>ANNUALLY</span>
            </p>
            <p className='text-sm text-emerald-400 mt-1'>30% off</p>
          </div>

          <Button
            className='w-full bg-white text-black hover:bg-gray-200 font-semibold'
          >
            Get Started
          </Button>

          <div className='space-y-3 pt-2'>
            {annualPlan.map((item, i) => (
              <PlanFeature key={i} text={item} />
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}

export default Subscription