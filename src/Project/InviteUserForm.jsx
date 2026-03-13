import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const InviteUserForm = () => {

  const form = useForm({
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (data) => {
    console.log("Invite sent to:", data.email)
  }

  return (
    <div className='pt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter email or username"
                    className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold'
          >
            Send Invite
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm