import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'

const Signup = ({ onLogin }) => {

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data) => {
    // TODO: connect to backend
    // const response = await axios.post("/api/auth/signup", data)
    console.log("Signup data:", data)
    onLogin()
  }

  return (
    <div className='min-h-screen bg-[#0e0f1f] flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>

        {/* Logo */}
        <div className='flex items-center justify-center gap-3 mb-8'>
          <img src={logo} alt="CodeHarbour" className='w-10 h-10 rounded-md object-contain' />
          <p className='text-xl font-bold text-white tracking-wide'>CodeHarBour</p>
        </div>

        {/* Card */}
        <div className='bg-[#131525] border border-[#252a45] rounded-xl p-8'>

          <h1 className='text-2xl font-bold text-white mb-1'>Create an account</h1>
          <p className='text-sm text-gray-500 mb-6'>Sign up to start managing your projects</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-300'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-300'>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-300'>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-2'
              >
                Create Account
              </Button>

            </form>
          </Form>

          <p className='text-sm text-gray-500 text-center mt-6'>
            Already have an account?
            <span
              onClick={() => navigate('/login')}
              className='text-indigo-400 cursor-pointer hover:text-indigo-300 ml-1'
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signup