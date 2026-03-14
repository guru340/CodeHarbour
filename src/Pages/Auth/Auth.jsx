import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.png'

const Auth = ({ onLogin }) => {

  const [isSignup, setIsSignup] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  })

  const onSubmit = (data) => {
    console.log(isSignup ? "Signup:" : "Login:", data)
    onLogin()  // ✅ call this after successful login/signup
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

          {/* Title */}
          <h1 className='text-2xl font-bold text-white mb-1'>
            {isSignup ? "Create an account" : "Welcome back"}
          </h1>
          <p className='text-sm text-gray-500 mb-6'>
            {isSignup
              ? "Sign up to start managing your projects"
              : "Login to continue to CodeHarBour"
            }
          </p>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

              {/* Name — only on signup */}
              {isSignup && (
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
              )}

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

              {/* Submit */}
              <Button
                type="submit"
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-2'
              >
                {isSignup ? "Create Account" : "Login"}
              </Button>

            </form>
          </Form>

          {/* Toggle login/signup */}
          <p className='text-sm text-gray-500 text-center mt-6'>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={() => { setIsSignup(!isSignup); form.reset() }}
              className='text-indigo-400 cursor-pointer hover:text-indigo-300 ml-1'
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>

        </div>

      </div>
    </div>
  )
}

export default Auth