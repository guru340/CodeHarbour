import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import React from 'react'

const ProjectCard = ({ project }) => {

  const categoryColors = {
    fullstack: "text-blue-400",
    frontend: "text-purple-400",
    backend: "text-emerald-400",
  }

  const categoryColor = categoryColors[project?.category?.toLowerCase()] || "text-gray-400"

  return (
  
    <Card className="p-5 w-full lg:max-w-3xl bg-[#131525]/80 border border-[#252a45] hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-200 cursor-pointer group">
      <div className='space-y-4'>

        {/* Title Row */}
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3 flex-wrap'>
            <h1 className='cursor-pointer font-bold text-lg text-white group-hover:text-indigo-400 transition-colors duration-200'>
              {project?.name || "Create Ecommerce Project"}
            </h1>
            <DotFilledIcon className="text-gray-600" />
            <p className={`text-sm font-medium ${categoryColor}`}>
              {project?.category || "fullstack"}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className='rounded-full hover:bg-[#1e2340]' variant='ghost' size='icon'>
                <DotsVerticalIcon className="text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
          
            <DropdownMenuContent className="bg-[#131525] border border-[#252a45] text-white">
              <DropdownMenuItem className="hover:bg-[#1e2340] cursor-pointer">
                Update
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#1e2340] cursor-pointer text-red-400">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {project?.description || "Build a full-featured ecommerce platform with product listings, cart, and checkout."}
        </p>

        {/* Tech Tags */}
        {project?.tech && (
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((tech, i) => (
              <span
                key={i}
               
                className="text-xs px-3 py-1 rounded-full border border-[#2e3460] text-gray-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

      </div>
    </Card>
  )
}

export default ProjectCard;