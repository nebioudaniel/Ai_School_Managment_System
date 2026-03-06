'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Bot, Send } from 'lucide-react'

export default function AIPage() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim() || loading) return

        const newMessages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            })

            if (!res.ok) throw new Error('Failed to fetch')

            const data = await res.json()
            setMessages([...newMessages, { role: 'assistant', content: data.message }])
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: 'Oops! Something went wrong. Make sure DEEPSEEK_API_KEY is configured.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-[calc(100vh-8rem)] flex flex-col">
            <Card className="flex-1 flex flex-col">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        AI Assistant
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-900 rounded-2xl p-4 animate-pulse">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t bg-white">
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask me to generate a math quiz..."
                                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
