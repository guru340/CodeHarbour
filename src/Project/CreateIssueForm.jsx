import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CreateIssueForm = ({ status, onSubmitIssue }) => {

  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
    }
  })

  const onSubmit = (data) => {
    onSubmitIssue(status, data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-2'>

        <FormField
          control={form.control}
          name="issueName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="issueName..."
                  className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="description..."
                  className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className='bg-white text-black hover:bg-gray-200 font-semibold'
        >
          Create Issue
        </Button>

      </form>
    </Form>
  )
}

export default CreateIssueForm