import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { messages } = await req.json()

    try {
        const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful AI assistant for EduSaaS platform. You assist teachers and students.' },
                    ...messages
                ],
                temperature: 0.7
            })
        })

        if (!res.ok) {
            throw new Error(`DeepSeek API error: ${res.statusText}`)
        }

        const data = await res.json()
        return NextResponse.json({ message: data.choices[0].message.content })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
