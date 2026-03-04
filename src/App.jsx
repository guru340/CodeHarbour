import { useState } from 'react'

import './App.css'

import { Card } from './components/ui/card'
import { Button } from './components/ui/button'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { CardContent } from './components/ui/card'
import { ScrollArea } from "@/components/ui/scroll-area"


function App() {
  const [showFilters, setShowFilters] = useState(true)

  return (
    <>
    
      <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
   
        <section className='filtersection w-full lg:w-[20rem]'>
          <Card className="p-5 sticky top-10 w-full bg-[#0f1117] border border-[#2a2d35] rounded-xl">
            <div className='flex flex-row items-center justify-between w-full'>
              <p className='text-base font-normal tracking-tight text-white'>filters</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="text-white hover:bg-[#1e2130] hover:text-white"
              >
                <MixerHorizontalIcon />
              </Button>
            </div>

            {showFilters && (
              <CardContent  className="mt-5">
              <ScrollArea className="space-y-7 has-[70vh]:"></ScrollArea>
            </CardContent>
            )}
          </Card>
        </section>

     
      </div>
    </>
  );
}

export default App;