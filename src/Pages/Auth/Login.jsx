import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'  // ✅ ADDED
import { login } from '@/Redux/Auth/Action'              // ✅ ADDED

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)  // ✅ ADDED

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (data) => {
    dispatch(login(data))  // ✅ dispatch Redux action instead of direct axios
  }

  // ✅ redirect to home when user is set in Redux
  useEffect(() => {
    if (auth.user) {
      navigate("/")
    }
  }, [auth.user])

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

          <h1 className='text-2xl font-bold text-white mb-1'>Welcome back</h1>
          <p className='text-sm text-gray-500 mb-6'>Login to continue to CodeHarBour</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

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
                Login
              </Button>

            </form>
          </Form>

          <p className='text-sm text-gray-500 text-center mt-6'>
            Don't have an account?
            <span
              onClick={() => navigate('/signup')}
              className='text-indigo-400 cursor-pointer hover:text-indigo-300 ml-1'
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login