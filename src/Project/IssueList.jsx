import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon, DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CreateIssueForm from '@/Project/CreateIssueForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { updateIssueStatus, deleteIssue, addUserToIssue } from '@/Redux/Issue/Action'

const IssueList = ({ status, title, issues, projectId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { ProjectDetails } = useSelector((store) => store.project)
  const members = ProjectDetails?.team || []
  const { user } = useSelector((store) => store.auth)

  
  const [editIssue, setEditIssue] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

 
  const handleChangeStatus = (issueId, newStatus) => {
    dispatch(updateIssueStatus({ id: issueId, status: newStatus }))
  }

  
  const handleDeleteIssue = (issueId) => {
    dispatch(deleteIssue(issueId))
  }

 
  const handleAssignUser = (issueId, userId) => {
    dispatch(addUserToIssue(issueId, userId))
  }

  return (
    <div className='min-w-[270px] w-[270px] bg-[#131525] border border-[#252a45] rounded-xl p-4 flex flex-col gap-3'>

      <h3 className='font-semibold text-white text-sm'>{title}</h3>

      {(issues || []).map((issue) => {
        const assigneeName = issue.assignee?.fullName || null
        const assigneeInitial = assigneeName?.charAt(0).toUpperCase() || null
        const isAssignedToMe = issue.assignee?.id === user?.id

        return (
          <Card
            key={issue.id}
            className='bg-[#0e0f1f] border border-[#252a45] p-3 hover:border-indigo-500/50 transition-colors'
          >
            <div className='flex justify-between items-start mb-3'>
              <p
                onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)}
                className='text-sm font-semibold text-white cursor-pointer hover:text-indigo-400 transition-colors'
              >
                {issue.title}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='h-6 w-6 hover:bg-[#1e2340] text-gray-400'>
                    <DotsVerticalIcon className='w-3 h-3' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-[#131525] border border-[#252a45] text-white'>

                  {/* FIX 2: Edit — opens dialog with issue data prefilled */}
                  <DropdownMenuItem
                    onClick={() => {
                      setEditIssue(issue)
                      setEditDialogOpen(true)
                    }}
                    className='hover:bg-[#1e2340] cursor-pointer'
                  >
                    Edit
                  </DropdownMenuItem>

                  {/* Delete works now — correct import */}
                  <DropdownMenuItem
                    onClick={() => handleDeleteIssue(issue.id)}
                    className='hover:bg-[#1e2340] cursor-pointer text-red-400'
                  >
                    Delete
                  </DropdownMenuItem>

                  <div className='border-t border-[#252a45] my-1' />

                  {/* Status — uppercase to match backend */}
                  <DropdownMenuItem
                    onClick={() => handleChangeStatus(issue.id, "IN_PROGRESS")}
                    className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-2'
                  >
                    <div className='w-2 h-2 rounded-full bg-orange-500' />
                    <p className='text-sm text-orange-400'>In Progress</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleChangeStatus(issue.id, "DONE")}
                    className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-2'
                  >
                    <div className='w-2 h-2 rounded-full bg-emerald-500' />
                    <p className='text-sm text-emerald-400'>Done</p>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className='flex justify-between items-center'>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                issue.priority === "HIGH"   ? "border-red-500/40 text-red-400 bg-red-500/10" :
                issue.priority === "MEDIUM" ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10" :
                                              "border-green-500/40 text-green-400 bg-green-500/10"
              }`}>
                {issue.priority || "MEDIUM"}
              </span>

              {/*FIX 5: Assignee dropdown with onClick on each member */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors
                      ${isAssignedToMe
                        ? "bg-indigo-600 border-indigo-400 text-white"
                        : assigneeInitial
                          ? "bg-[#1e2340] border-[#252a45] text-white hover:border-indigo-500"
                          : "bg-[#1e2340] border-[#252a45] hover:border-indigo-500"
                      }`}
                    title={assigneeName || "Unassigned"}
                  >
                    {assigneeInitial || <PersonIcon className='w-3 h-3 text-gray-500' />}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='bg-[#131525] border border-[#252a45] text-white w-44'>
                  <p className='text-xs text-gray-500 px-2 py-1'>Assign to</p>

                  {/* Current user — Me */}
                  {user && (
                    <DropdownMenuItem
                      onClick={() => handleAssignUser(issue.id, user.id)} // onClick added
                      className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-3 py-2'
                    >
                      <div className='w-7 h-7 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center text-xs font-semibold text-white'>
                        {user.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className='text-sm text-white'>
                          {user.fullName}
                          <span className='ml-1 text-xs text-indigo-400'>(me)</span>
                        </p>
                        <p className='text-xs text-gray-500'>{user.email}</p>
                      </div>
                    </DropdownMenuItem>
                  )}

                  <div className='border-t border-[#252a45] my-1' />

                  {/* Other members */}
                  {members
                    .filter((m) => m.id !== user?.id)
                    .map((member) => (
                      <DropdownMenuItem
                        key={member.id}
                        onClick={() => handleAssignUser(issue.id, member.id)} // onClick added
                        className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-3 py-2'
                      >
                        <div className='w-7 h-7 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white'>
                          {member.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className='text-sm text-white'>{member.fullName}</p>
                          <p className='text-xs text-gray-500'>{member.email}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        )
      })}

      {/* Edit Dialog — opens with issue prefilled */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className='bg-[#131525] border border-[#252a45] text-white'>
          <DialogHeader className='text-lg font-semibold'>Edit Issue</DialogHeader>
          {editIssue && (
            <CreateIssueForm
              status={status}
              projectId={projectId}
              editIssue={editIssue}           // pass issue data for prefill
              onClose={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Issue Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            className='w-full mt-1 border border-dashed border-[#252a45] text-gray-500 hover:text-white hover:bg-[#1e2340] text-xs gap-1'
          >
            <PlusIcon /> Create Issue
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-[#131525] border border-[#252a45] text-white'>
          <DialogHeader className='text-lg font-semibold'>Create New Issue</DialogHeader>
          <CreateIssueForm status={status} projectId={projectId} />
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default IssueList