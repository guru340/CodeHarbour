import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon, DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CreateIssueForm from '@/Project/CreateIssueForm'
import { useNavigate } from 'react-router-dom'  // ✅ ADDED

const members = [
  { name: "Raam", username: "@raam", avatar: "R" },
  { name: "Zosh", username: "@zosh", avatar: "Z" },
]

const IssueList = ({ status, title, issues, projectId, onCreateIssue, onDeleteIssue, onChangeAssignee, onChangeStatus }) => {

  const navigate = useNavigate()  // ✅ ADDED

  return (
    <div className='min-w-[270px] w-[270px] bg-[#131525] border border-[#252a45] rounded-xl p-4 flex flex-col gap-3'>

      {/* Column Title */}
      <h3 className='font-semibold text-white text-sm'>{title}</h3>

      {/* Issue Cards */}
      {issues.map((issue) => (
        <Card
          key={issue.id}
          className='bg-[#0e0f1f] border border-[#252a45] p-3 hover:border-indigo-500/50 transition-colors'
        >
          <div className='flex justify-between items-start mb-3'>

            {/* ✅ Title is now clickable */}
            <p
              onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)}
              className='text-sm font-semibold text-white cursor-pointer hover:text-indigo-400 transition-colors'
            >
              {issue.title}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant='ghost' size='icon' className='h-6 w-6 hover:bg-[#1e2340] text-gray-400'>
                  <DotsVerticalIcon className='w-3 h-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-[#131525] border border-[#252a45] text-white'>
                <DropdownMenuItem className='hover:bg-[#1e2340] cursor-pointer'>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteIssue(issue.id)}
                  className='hover:bg-[#1e2340] cursor-pointer text-red-400'
                >
                  Delete
                </DropdownMenuItem>

                <div className='border-t border-[#252a45] my-1' />

                <DropdownMenuItem
                  onClick={() => onChangeStatus(issue.id, "in_progress")}
                  className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-2'
                >
                  <div className='w-2 h-2 rounded-full bg-orange-500' />
                  <p className='text-sm text-orange-400'>In Progress</p>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onChangeStatus(issue.id, "done")}
                  className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-2'
                >
                  <div className='w-2 h-2 rounded-full bg-emerald-500' />
                  <p className='text-sm text-emerald-400'>Done</p>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-xs text-gray-500'>{issue.issue}</span>

            {/* Assignee Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='w-7 h-7 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white cursor-pointer hover:border-indigo-500 transition-colors'>
                  {issue.assignee || <PersonIcon className='w-3 h-3 text-gray-500' />}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-[#131525] border border-[#252a45] text-white w-44'>
                {members.map((member) => (
                  <DropdownMenuItem
                    key={member.username}
                    onClick={() => onChangeAssignee(issue.id, member.avatar)}
                    className='hover:bg-[#1e2340] cursor-pointer flex items-center gap-3 py-2'
                  >
                    <div className='w-7 h-7 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold'>
                      {member.avatar}
                    </div>
                    <div>
                      <p className='text-sm text-white'>{member.name}</p>
                      <p className='text-xs text-gray-500'>{member.username}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </Card>
      ))}

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
          <CreateIssueForm status={status} onSubmitIssue={onCreateIssue} />
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default IssueList