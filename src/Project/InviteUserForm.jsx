import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { InviteToProject } from '@/Redux/Project/Action'
import { useParams } from 'react-router-dom'

const InviteUserForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const { id: projectId } = useParams() // ✅ get projectId from URL

  const [status, setStatus] = useState(null) // "success" | "error"

  const form = useForm({
    defaultValues: { email: "" }
  })

  const onSubmit = async (data) => {
    if (!data.email.trim()) return
    try {
      await dispatch(InviteToProject({
        email: data.email.trim(),
        projectId: Number(projectId),
      }))
      setStatus("success")
      form.reset()
      // ✅ Auto close dialog after 1.5s
      setTimeout(() => {
        setStatus(null)
        onClose?.()
      }, 1500)
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <div className='pt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter user's email"
                    className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Success / Error feedback */}
          {status === "success" && (
            <p className='text-sm text-emerald-400 text-center'>
              ✅ Invite sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className='text-sm text-red-400 text-center'>
              ❌ Failed to send invite. Check the email and try again.
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "success"}
            className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold'
          >
            Send Invite
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm