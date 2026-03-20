import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssueById, updateIssueStatus } from '@/Redux/Issue/Action'
import { fetchComments, createComment, deleteComment } from '@/Redux/Comment/Action'
import { TrashIcon } from '@radix-ui/react-icons'

const IssueDetailpage = () => {
  const { issueId } = useParams()
  const dispatch = useDispatch()

  const { issueDetails, loading } = useSelector((store) => store.issue)
  const { comments, loading: commentLoading } = useSelector((store) => store.comment)
  const { user } = useSelector((store) => store.auth)

  const [activeTab, setActiveTab] = useState("Comments")
  const [comment, setComment] = useState("")

  // Fetch issue + comments on mount
  useEffect(() => {
    if (issueId) {
      dispatch(fetchIssueById(issueId))
      dispatch(fetchComments(issueId))
    }
  }, [issueId])

  const handleSaveComment = () => {
    if (!comment.trim()) return
    dispatch(createComment({
      issueId: Number(issueId),
      content: comment.trim(),
    }))
    setComment("")
  }

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId))
  }

  const handleStatusChange = (status) => {
    dispatch(updateIssueStatus({ id: issueId, status }))
  }

  const getStatusStyle = (status) => {
    const s = String(status || "").toUpperCase()
    if (s === "IN_PROGRESS") return "bg-orange-500/10 border-orange-500/30 text-orange-400"
    if (s === "DONE")        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
    return "bg-gray-500/10 border-gray-500/30 text-gray-400"
  }

  const getPriorityStyle = (priority) => {
    if (priority === "HIGH")   return "text-red-400"
    if (priority === "MEDIUM") return "text-yellow-400"
    return "text-green-400"
  }

  if (loading && !issueDetails) {
    return (
      <div className="min-h-screen bg-[#0e0f1f] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading issue...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white px-10 py-8'>
      <div className='lg:flex gap-8'>

        {/* LEFT */}
        <div className='flex-1 space-y-6'>

          <h1 className='text-xl font-bold text-white'>
            {issueDetails?.title || "Issue not found"}
          </h1>

          <div>
            <p className='text-sm font-semibold text-white mb-1'>Description</p>
            <p className='text-sm text-gray-400'>{issueDetails?.description || "-"}</p>
          </div>

          {/* Activity */}
          <div>
            <p className='text-sm font-semibold text-white mb-3'>Activity</p>

            {/* Tabs */}
            <div className='flex gap-1 mb-4'>
              {["All", "Comments", "History"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded text-sm transition-colors
                    ${activeTab === tab ? "bg-[#1e2340] text-white" : "text-gray-500 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Comment input */}
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0'>
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveComment()}
                placeholder="add a comment..."
                className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
              />
              <Button
                onClick={handleSaveComment}
                disabled={commentLoading || !comment.trim()}
                variant='outline'
                className='border-[#252a45] text-white hover:bg-[#1e2340] disabled:opacity-50'
              >
                save
              </Button>
            </div>

            {/* Comments list */}
            <div className='mt-4 space-y-3'>
              {(activeTab === "All" || activeTab === "Comments") && (
                commentLoading && comments.length === 0 ? (
                  <p className='text-sm text-gray-600'>Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map((c) => {
                    // ✅ backend field: c.user or c.createdBy — adjust if needed
                    const author = c.user || c.createdBy
                    const isMyComment = author?.id === user?.id
                    return (
                      <div key={c.id} className='flex items-start gap-3 group'>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold text-white flex-shrink-0
                          ${isMyComment ? "bg-indigo-600 border-indigo-400" : "bg-[#1e2340] border-[#252a45]"}`}>
                          {author?.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className='flex-1 bg-[#131525] border border-[#252a45] rounded-lg px-4 py-3'>
                          <div className='flex justify-between items-start mb-1'>
                            <p className='text-xs font-semibold text-gray-400'>
                              {isMyComment ? "You" : author?.fullName || "User"}
                            </p>
                            {/* ✅ Delete button — only show for own comments */}
                            {isMyComment && (
                              <button
                                onClick={() => handleDeleteComment(c.id)}
                                className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400'
                              >
                                <TrashIcon className='w-3 h-3' />
                              </button>
                            )}
                          </div>
                          <p className='text-sm text-gray-300'>{c.content}</p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className='text-sm text-gray-500'>No comments yet.</p>
                )
              )}

              {activeTab === "History" && (
                <p className='text-sm text-gray-500'>No history yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className='lg:w-[320px] w-full mt-6 lg:mt-0 space-y-4'>

          <Select
            value={String(issueDetails?.status || "PENDING").toUpperCase()}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className='bg-[#0e0f1f] border border-[#252a45] text-white focus:ring-0 focus:border-indigo-500'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-[#131525] border border-[#252a45] text-white'>
              <SelectItem value="PENDING">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>

          <Card className='bg-[#0f1117] border border-[#252a45] rounded-xl'>
            <div className='px-5 py-4 border-b border-[#252a45]'>
              <p className='text-sm font-semibold text-white'>Details</p>
            </div>
            <div className='px-5 py-4 space-y-4'>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Assignee</span>
                <div className='flex items-center gap-2'>
                  {issueDetails?.assignee ? (
                    <>
                      <div className='w-7 h-7 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center text-xs font-semibold text-white'>
                        {issueDetails.assignee.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <span className='text-sm text-white'>{issueDetails.assignee.fullName}</span>
                    </>
                  ) : (
                    <span className='text-sm text-gray-500'>Unassigned</span>
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Priority</span>
                <span className={`text-sm font-medium ${getPriorityStyle(issueDetails?.priority)}`}>
                  {issueDetails?.priority || "-"}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Status</span>
                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusStyle(issueDetails?.status)}`}>
                  {issueDetails?.status || "-"}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Project</span>
                <span className='text-sm text-white'>{issueDetails?.project?.name || "-"}</span>
              </div>

              {/* ✅ Comments count */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Comments</span>
                <span className='text-sm text-white'>{comments.length}</span>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default IssueDetailpage