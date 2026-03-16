import React, { useState } from 'react'
import IssueList from '@/Project/IssueList'
import ChatBox from '@/Project/ChatBox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import InviteUserForm from '@/Project/InviteUserForm'
import { Badge } from '@/components/ui/badge'
import { useParams } from 'react-router-dom'  // ✅ ADDED

const projectData = {
  name: "Create Ecommerce Website Using React",
  lead: "Raam",
  members: ["R", "Z"],
  category: "fullstack",
  status: "In Progress",
}

const statusColors = {
  "In Progress": "bg-orange-500 hover:bg-orange-600",
  "Done": "bg-emerald-500 hover:bg-emerald-600",
  "Pending": "bg-gray-500 hover:bg-gray-600",
}

const ProjectDetail = () => {

  const { id } = useParams()  // ✅ ADDED

  const [issues, setIssues] = useState({
    pending: [
      { id: 1, title: "create footer", issue: "FBP - 1", assignee: "R" },
      { id: 2, title: "create home page", issue: "FBP - 2", assignee: null },
    ],
    in_progress: [
      { id: 3, title: "create navbar", issue: "FBP - 1", assignee: "Z" },
    ],
    done: [],
  })

  const handleChangeStatus = (issueId, newStatus) => {
    setIssues(prev => {
      let movedIssue = null
      const updated = {}
      for (const [key, list] of Object.entries(prev)) {
        updated[key] = list.filter(i => {
          if (i.id === issueId) { movedIssue = i; return false }
          return true
        })
      }
      if (movedIssue) updated[newStatus] = [...updated[newStatus], movedIssue]
      return updated
    })
  }

  const handleChangeAssignee = (issueId, avatar) => {
    setIssues(prev => {
      const updated = {}
      for (const [key, list] of Object.entries(prev)) {
        updated[key] = list.map(i => i.id === issueId ? { ...i, assignee: avatar } : i)
      }
      return updated
    })
  }

  const handleCreateIssue = (status, data) => {
    const newIssue = {
      id: Date.now(),
      title: data.description,
      issue: "FBP - " + (issues[status].length + 1),
      assignee: null,
    }
    setIssues(prev => ({ ...prev, [status]: [...prev[status], newIssue] }))
  }

  const handleDeleteIssue = (issueId) => {
    setIssues(prev => {
      const updated = {}
      for (const [key, list] of Object.entries(prev)) {
        updated[key] = list.filter(i => i.id !== issueId)
      }
      return updated
    })
  }

  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white mt-5 lg:px-10 px-5'>
      <div className='lg:flex gap-5'>

        {/* LEFT: main content */}
        <div className='flex-1'>
          <ScrollArea className="h-screen pr-2">

            {/* Project Title */}
            <div className='pb-6 border-b border-[#252a45]'>
              <h1 className='text-2xl font-bold text-white'>{projectData.name}</h1>
            </div>

            {/* Project Info */}
            <div className='py-6 space-y-4 border-b border-[#252a45]'>

              {/* Lead */}
              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Project Lead :</span>
                <span className='text-white'>{projectData.lead}</span>
              </div>

              {/* Members */}
              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Members :</span>
                <div className='flex items-center gap-2'>
                  {projectData.members.map((m, i) => (
                    <div
                      key={i}
                      className='w-8 h-8 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-sm font-semibold text-white'
                    >
                      {m}
                    </div>
                  ))}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 px-3 text-xs border-[#252a45] bg-[#131525] text-gray-300 hover:bg-[#1e2340] hover:text-white'
                      >
                        invite +
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='bg-[#131525] border border-[#252a45] text-white'>
                      <DialogHeader className='text-lg font-semibold'>Inite User</DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Category */}
              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Category :</span>
                <span className='text-white'>{projectData.category}</span>
              </div>

              {/* Status */}
              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Status :</span>
                <Badge className={`${statusColors[projectData.status]} text-white text-xs px-3 py-1 rounded-full`}>
                  {projectData.status}
                </Badge>
              </div>

            </div>

            {/* Tasks Section */}
            <section>
              <p className='py-5 border-b text-lg tracking-wider text-white'>Tasks</p>
              <div className='lg:flex md:flex gap-3 justify-between py-5'>
                {/* ✅ ADDED projectId={id} to all three */}
                <IssueList status="pending"     title="Todo List"   projectId={id} issues={issues.pending}     onCreateIssue={handleCreateIssue} onDeleteIssue={handleDeleteIssue} onChangeAssignee={handleChangeAssignee} onChangeStatus={handleChangeStatus} />
                <IssueList status="in_progress" title="In Progress" projectId={id} issues={issues.in_progress} onCreateIssue={handleCreateIssue} onDeleteIssue={handleDeleteIssue} onChangeAssignee={handleChangeAssignee} onChangeStatus={handleChangeStatus} />
                <IssueList status="done"        title="Done"        projectId={id} issues={issues.done}        onCreateIssue={handleCreateIssue} onDeleteIssue={handleDeleteIssue} onChangeAssignee={handleChangeAssignee} onChangeStatus={handleChangeStatus} />
              </div>
            </section>

          </ScrollArea>
        </div>

        {/* RIGHT: Chat Box */}
        <div className='lg:w-[320px] w-full mt-5 lg:mt-0'>
          <ChatBox />
        </div>

      </div>
    </div>
  )
}

export default ProjectDetail