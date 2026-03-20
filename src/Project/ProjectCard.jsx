import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DeleteProject } from '@/Redux/Project/Action'

// onTagClick and activeTag passed from Project.jsx
const ProjectCard = ({ project, onTagClick, activeTag }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
      dispatch(DeleteProject(project?.id));
  }

  const navigate = useNavigate()

  const categoryColors = {
    fullstack: "text-blue-400",
    frontend: "text-purple-400",
    backend: "text-emerald-400",
  }

  const categoryColor = categoryColors[project?.category?.toLowerCase()] || "text-gray-400"

  //  Use project.tags (your actual backend field)
  const projectTags = project?.tags || []

  return (
    <Card className="p-5 w-full lg:max-w-3xl bg-[#131525]/80 border border-[#252a45] hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-200 group">
      <div className='space-y-4'>

        {/* Header */}
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3 flex-wrap'>
            <h1
              onClick={() => navigate(`/project/${project?.id}`)}
              className='cursor-pointer font-bold text-lg text-white group-hover:text-indigo-400 transition-colors duration-200'
            >
              {project?.name || "Untitled Project"}
            </h1>
            <DotFilledIcon className="text-gray-600" />
            <p className={`text-sm font-medium ${categoryColor}`}>
              {project?.category || "fullstack"}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='rounded-full hover:bg-[#1e2340]' variant='ghost' size='icon'>
                <DotsVerticalIcon className="text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#131525] border border-[#252a45] text-white">
              <DropdownMenuItem className="hover:bg-[#1e2340] cursor-pointer">Update</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#1e2340] cursor-pointer text-red-400" onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {project?.description || "No description provided."}
        </p>

        {/*  Tags — show on card, clickable to filter */}
        {projectTags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {projectTags.map((tag, i) => {
              const isActive = activeTag === tag
              return (
                <span
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    // clicking active tag resets filter, clicking new tag sets it
                    onTagClick?.(isActive ? "all" : tag)
                  }}
                  className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-all duration-150 select-none
                    ${isActive
                      ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 shadow-sm shadow-indigo-500/20"
                      : "border-[#2e3460] text-gray-400 hover:border-indigo-500 hover:text-indigo-400"
                    }`}
                >
                  #{tag}
                </span>
              )
            })}
          </div>
        )}

      </div>
    </Card>
  )
}

export default ProjectCard