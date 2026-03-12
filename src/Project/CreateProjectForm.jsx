import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CreateProjectForm = () => {

  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["javascript", "react"],        
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const tags = ["javascript", "react", "next.js", "springboot", "mysql", "mongodb", "angular", "python", "flask", "django"]
  const categories = ["FullStack", "Frontend", "Backend"]

  return (
    <div className='pt-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Project Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter project name"
                    className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Short description"
                    className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='bg-[#0e0f1f] border border-[#252a45] text-white focus:ring-0 focus:border-indigo-500'>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-[#131525] border border-[#252a45] text-white'>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className='hover:bg-[#1e2340] cursor-pointer'>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Tags</FormLabel>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {tags.map((tag) => {
                    const isSelected = field.value.includes(tag)
                    return (
                      <span
                        key={tag}
                        onClick={() => {
                          if (isSelected) {
                            field.onChange(field.value.filter((t) => t !== tag))
                          } else {
                            field.onChange([...field.value, tag])
                          }
                        }}
                        className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-colors duration-150
                          ${isSelected
                            ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                            : 'border-[#252a45] text-gray-400 hover:border-indigo-500 hover:text-indigo-400'
                          }`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors'
          >
            Create Project
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm