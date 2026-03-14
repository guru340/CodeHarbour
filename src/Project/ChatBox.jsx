import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

const mockMessages = [
  { id: 1, sender: "Raam", avatar: "R", text: "How are you", align: "left" },
  { id: 2, sender: "Raam", avatar: "R", text: "How are you", align: "right" },
  { id: 3, sender: "Raam", avatar: "R", text: "How are you", align: "left" },
  { id: 4, sender: "Raam", avatar: "R", text: "How are you", align: "right" },
]

const ChatBox = () => {

  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = {
      id: Date.now(),
      sender: "Raam",
      avatar: "R",
      text: input,
      align: "right",
    }
    setMessages(prev => [...prev, newMsg])
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div className='w-full bg-[#0f1117] border border-[#252a45] rounded-xl flex flex-col h-[500px]'>

      {/* Header */}
      <div className='px-5 py-4 border-b border-[#252a45]'>
        <p className='text-white font-semibold'>Chat Box</p>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.align === "right" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div className='w-8 h-8 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0'>
              {msg.avatar}
            </div>

            {/* Bubble */}
            <div className='bg-[#1a1d2e] border border-[#252a45] rounded-xl px-4 py-2 max-w-[60%]'>
              <p className='text-sm font-semibold text-white mb-1'>{msg.sender}</p>
              <p className='text-sm text-gray-400'>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className='px-4 py-3 border-t border-[#252a45] flex gap-2'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className='bg-[#0e0f1f] border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500'
        />
        <Button
          onClick={handleSend}
          size='icon'
          className='bg-indigo-600 hover:bg-indigo-700 text-white flex-shrink-0'
        >
          <PaperPlaneIcon />
        </Button>
      </div>

    </div>
  )
}

export default ChatBox