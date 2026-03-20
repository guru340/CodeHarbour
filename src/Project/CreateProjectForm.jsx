import React, { useState } from "react"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogClose } from "@/components/ui/dialog"
import { useDispatch } from "react-redux"
import { CreateProject } from "@/Redux/Project/Action"

const CreateProjectForm = () => {
  const dispatch = useDispatch()

  //  Start with empty tags — no tags pre-selected by default
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    }
  })

  //Track dialog close separately so it only closes on valid submit
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onSubmit = (data) => {
    dispatch(CreateProject(data))
    console.log("Submitting project:", data)
    setSubmitSuccess(true)
  }

  const tags = [
    "javascript",
    "react",
    "next.js",
    "springboot",
    "mysql",
    "mongodb",
    "angular",
    "python",
    "flask",
    "django"
  ]

  const categories = ["FullStack", "Frontend", "Backend"]

  const projectLimitReached = false

  return (
    <div className="pt-4">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Project name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Project Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter project name"
                    className="bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500"
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
                <FormLabel className="text-gray-300">Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Short description"
                    className="bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500"
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
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Category</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#0e0f1f] border border-[#252a45] text-white focus:ring-0 focus:border-indigo-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-[#131525] border border-[#252a45] text-white">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="hover:bg-[#1e2340] cursor-pointer"
                      >
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
                <FormLabel className="text-gray-300">
                  Tags{" "}
                  {/* Shows how many tags are selected */}
                  {field.value.length > 0 && (
                    <span className="ml-1 text-indigo-400 text-xs font-normal">
                      ({field.value.length} selected)
                    </span>
                  )}
                </FormLabel>

                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((tag) => {
                    const isSelected = field.value.includes(tag)

                    return (
                      <span
                        key={tag}
                        onClick={() => {
                          // Toggle: remove if selected, add if not
                          if (isSelected) {
                            field.onChange(field.value.filter((t) => t !== tag))
                          } else {
                            field.onChange([...field.value, tag])
                          }
                        }}
                        className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-all duration-150 select-none
                          ${
                            isSelected
                              ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 shadow-sm shadow-indigo-500/20"
                              : "border-[#252a45] text-gray-400 hover:border-indigo-500 hover:text-indigo-400"
                          }`}
                      >
                        {/* Shows a checkmark on selected tags */}
                        {isSelected && <span className="mr-1">✓</span>}
                        {tag}
                      </span>
                    )
                  })}
                </div>

                {/*  Shows selected tags as a summary below */}
                {field.value.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected:{" "}
                    <span className="text-indigo-400">{field.value.join(", ")}</span>
                  </p>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Section */}
          {projectLimitReached ? (
            <div>
              <p className="text-sm text-red-400 text-center">
                You can create only 3 projects with the free plan. Please upgrade your plan.
              </p>
            </div>
          ) : submitSuccess ? (
            // FIX 3: Only close dialog after successful form submission
            <DialogClose asChild>
              <Button
                type="button"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
              >
                Done
              </Button>
            </DialogClose>
          ) : (
            // Normal submit — dialog stays open until form is valid
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              Create Project
            </Button>
          )}

        </form>
      </Form>

    </div>
  )
}

export default CreateProjectForm