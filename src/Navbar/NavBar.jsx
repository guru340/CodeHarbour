import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { Button } from '@/components/ui/button'
import CreateProjectForm from '@/Project/CreateProjectForm'
import { PersonIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import logo from '@/assets/logo.png'

const NavBar = () => {
  return (
    <>
    <div className='border-b border-[#252a45] py-4 px-5 flex items-center justify-between bg-[#0e0f1f]'>

        <div className='flex items-center gap-3'>

            {/* ✅ ADDED: Logo image + brand name side by side */}
            <div className='flex items-center gap-2 mr-2'>
                <img src={logo} alt="CodeHarbour Logo" className='w-8 h-8 rounded-md object-contain' />
                <p className='text-sm font-semibold tracking-wide text-white cursor-pointer'>
                    CodeHarBour
                </p>
            </div>

            <Dialog>
                <DialogTrigger>
                    <Button variant='ghost' className='text-sm font-semibold tracking-wide text-gray-300 cursor-pointer hover:bg-[#1e2340] hover:text-white'>
                        New Project
                    </Button>
                </DialogTrigger>
                <DialogContent className='bg-[#131525] border border-[#252a45] text-white'>
                    <DialogHeader className='text-lg font-semibold tracking-wide text-white'>
                        Create New Project
                        <CreateProjectForm/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Button variant='ghost' className='text-sm font-semibold tracking-wide text-gray-300 cursor-pointer hover:bg-[#1e2340] hover:text-white'>
                Upgrade
            </Button>

        </div>

        <div className='flex gap-3 items-center'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant='outline' size='icon' className="rounded-full border-[#252a45] bg-[#131525] hover:bg-[#1e2340] text-gray-300 hover:text-white">
                        <PersonIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-[#131525] border border-[#252a45] text-white'>
                    <DropdownMenuItem className='hover:bg-[#1e2340] cursor-pointer text-red-400'>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <p className='text-sm text-gray-300'>User</p>
        </div>

    </div>
    </>
  )
}

export default NavBar;