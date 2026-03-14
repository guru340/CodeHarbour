import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const issueData = {
  title: "create footer",
  description: "some description",
  assignee: { name: "Raam", avatar: "A" },
  reporter: { name: "Ashok", avatar: "A" },
  labels: "None",
  status: "pending",
  release: "-",
}

const IssueDetailpage = () => {

  const [activeTab, setActiveTab] = useState("Comments")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  const handleSaveComment = () => {
    if (!comment.trim()) return
    setComments(prev => [...prev, { id: Date.now(), text: comment, avatar: "R" }])
    setComment("")
  }

  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white px-10 py-8'>
      <div className='lg:flex gap-8'>

        {/* LEFT */}
        <div className='flex-1 space-y-6'>

          {/* Title */}
          <h1 className='text-xl font-bold text-white'>{issueData.title}</h1>

          {/* Description */}
          <div>
            <p className='text-sm font-semibold text-white mb-1'>Description</p>
            <p className='text-sm text-gray-400'>{issueData.description}</p>
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
                    ${activeTab === tab
                      ? "bg-[#1e2340] text-white"
                      : "text-gray-500 hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Comment Input */}
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0'>
                R
              </div>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="add a comment..."
                className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
              />
              <Button
                onClick={handleSaveComment}
                variant='outline'
                className='border-[#252a45] text-white hover:bg-[#1e2340]'
              >
                save
              </Button>
            </div>

            {/* Comments List */}
            <div className='mt-4 space-y-3'>
              {comments.map((c) => (
                <div key={c.id} className='flex items-start gap-3'>
                  <div className='w-8 h-8 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0'>
                    {c.avatar}
                  </div>
                  <div className='bg-[#131525] border border-[#252a45] rounded-lg px-4 py-2 text-sm text-gray-300'>
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className='lg:w-[320px] w-full mt-6 lg:mt-0 space-y-4'>

          {/* Status Select */}
          <Select defaultValue="todo">
            <SelectTrigger className='bg-[#0e0f1f] border border-[#252a45] text-white focus:ring-0 focus:border-indigo-500'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-[#131525] border border-[#252a45] text-white'>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* Details Card */}
          <Card className='bg-[#0f1117] border border-[#252a45] rounded-xl'>
            <div className='px-5 py-4 border-b border-[#252a45]'>
              <p className='text-sm font-semibold text-white'>Details</p>
            </div>

            <div className='px-5 py-4 space-y-4'>

              {/* Assignee */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Assignee</span>
                <div className='flex items-center gap-2'>
                  <div className='w-7 h-7 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white'>
                    {issueData.assignee.avatar}
                  </div>
                  <span className='text-sm text-white'>{issueData.assignee.name}</span>
                </div>
              </div>

              {/* Labels */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Labels</span>
                <span className='text-sm text-white'>{issueData.labels}</span>
              </div>

              {/* Status */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Status</span>
                <span className='text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400'>
                  {issueData.status}
                </span>
              </div>

              {/* Release */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Realese</span>
                <span className='text-sm text-white'>{issueData.release}</span>
              </div>

              {/* Reporter */}
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400'>Reporter</span>
                <div className='flex items-center gap-2'>
                  <div className='w-7 h-7 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white'>
                    {issueData.reporter.avatar}
                  </div>
                  <span className='text-sm text-white'>{issueData.reporter.name}</span>
                </div>
              </div>

            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default IssueDetailpage