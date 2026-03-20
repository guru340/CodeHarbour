import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatMessages,sendMessage } from '@/Redux/Chat/Action'
import { useParams } from 'react-router-dom'

const ChatBox = () => {
  const dispatch = useDispatch()
  const { id: projectId } = useParams()

  const { messages, loading } = useSelector((store) => store.chat)
  const { user } = useSelector((store) => store.auth)

  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    if (projectId) dispatch(fetchChatMessages(projectId))
  }, [projectId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || !user?.id || !projectId) return
    dispatch(sendMessage({
      senderId: user.id,
      projectId: Number(projectId),
      content: input.trim(),
    }))
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

        {loading && messages.length === 0 && (
          <p className='text-xs text-gray-600 text-center mt-4'>Loading messages...</p>
        )}

        {!loading && messages.length === 0 && (
          <p className='text-xs text-gray-600 text-center mt-4'>No messages yet. Say hi! 👋</p>
        )}

        {messages.map((msg) => {
          const sender = msg.senderAt
          
          // backend returns number, Redux user.id might be string or number
          const isMe = String(sender?.id) === String(user?.id)
          const senderName = sender?.fullName || sender?.name || "User"
          const senderInitial = senderName.charAt(0).toUpperCase()

          // debug log — remove after confirming it works
          console.log("msg:", msg.content, "| senderAt.id:", sender?.id, "| user.id:", user?.id, "| isMe:", isMe)

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold text-white flex-shrink-0
                ${isMe ? "bg-indigo-600 border-indigo-400" : "bg-[#1e2340] border-[#252a45]"}`}>
                {senderInitial}
              </div>

              {/* FIX: Bubble with content clearly shown */}
              <div className={`rounded-xl px-4 py-2 max-w-[65%] border
                ${isMe
                  ? "bg-indigo-600/20 border-indigo-500/30"
                  : "bg-[#1a1d2e] border-[#252a45]"
                }`}>
                <p className='text-xs font-semibold text-gray-400 mb-1'>
                  {isMe ? "You" : senderName}
                </p>
                {/*  msg.content — the actual message text */}
                <p className='text-sm text-white break-words'>
                  {msg.content || ""}
                </p>
              </div>
            </div>
          )
        })}

        <div ref={bottomRef} />
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