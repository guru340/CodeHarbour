import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Home  from './Pages/Home.jsx'
import { Card } from './components/ui/card'
import { Button } from './components/ui/button'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'

function App() {

  return (
    <>
     <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
      <section className='filtersection'>
        <Card className="p-5 sticky top-10">
          <div className='flex justify-between lg:w-[20rem]'>
              <p className='text-xl -tracking-wider'></p>
                <Button variant="ghost" size="icon">
                    <MixerHorizontalIcon/>
                </Button>
            </div> 
          
        </Card>
      </section>

     </div>
    </>
  
   
  )
}

export default App
