import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDispatch } from 'react-redux'
import { createIssue, updateIssue } from '@/Redux/Issue/Action'
import { useParams } from 'react-router-dom'

//editIssue prop — if passed, form runs in EDIT mode
const CreateIssueForm = ({ status, projectId: projectIdProp, editIssue, onClose }) => {
  const dispatch = useDispatch()
  const { id: projectIdFromUrl } = useParams()
  const projectId = projectIdProp || projectIdFromUrl

  const isEditMode = !!editIssue  // true if editing

  const form = useForm({
    defaultValues: {
      title:       editIssue?.title       || "",
      description: editIssue?.description || "",
      priority:    editIssue?.priority    || "MEDIUM",
    }
  })

  const onSubmit = (data) => {
    if (isEditMode) {
      // EDIT mode — dispatch updateIssue
      dispatch(updateIssue({
        id:          editIssue.id,
        title:       data.title,
        description: data.description,
        priority:    data.priority,
        status:      editIssue.status,
        projectId:   Number(projectId),
      }))
      onClose?.()
    } else {
      //  CREATE mode
      const issueData = {
        title:       data.title,
        description: data.description,
        projectId:   Number(projectId),
        priority:    data.priority,
        status:      status || "PENDING",
        assigneeId:  null,
      }

      if (!issueData.projectId) {
        console.error("projectId is null — cannot create issue")
        return
      }

      dispatch(createIssue(issueData))
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-2'>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Issue title..."
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
              <FormControl>
                <Input
                  {...field}
                  placeholder="Description..."
                  className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='bg-[#0e0f1f] border border-[#252a45] text-white focus:ring-0 focus:border-indigo-500'>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-[#131525] border border-[#252a45] text-white'>
                  <SelectItem value="LOW"    className="hover:bg-[#1e2340] cursor-pointer">🟢 Low</SelectItem>
                  <SelectItem value="MEDIUM" className="hover:bg-[#1e2340] cursor-pointer">🟡 Medium</SelectItem>
                  <SelectItem value="HIGH"   className="hover:bg-[#1e2340] cursor-pointer">🔴 High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!projectId}
          className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold transition-colors'
        >
          {isEditMode ? "Update Issue" : "Create Issue"}
        </Button>

      </form>
    </Form>
  )
}

export default CreateIssueForm