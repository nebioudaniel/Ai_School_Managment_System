'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, ArrowRight, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { authClient } from '@/lib/auth-client'
import { loginUser } from './actions'

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        // 1. Get the slug first
        const result = await loginUser(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
            return
        }

        // 2. Perform actual sign in
        const { error: signInError } = await authClient.signIn.email({
            email,
            password
        })

        if (signInError) {
            setError(signInError.message || 'Invalid login credentials.')
            setLoading(false)
        } else if (result.slug) {
            router.push(`/${result.slug}`)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-heading font-bold tracking-tight">Welcome back</h2>
                        <p className="mt-2 text-muted-foreground text-sm">
                            Access your school dashboard.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-xl text-xs font-bold">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1">
                            <label htmlFor="email" className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@school.com"
                                required
                                className="w-full h-11 bg-secondary/30 border border-border rounded-xl px-4 text-sm focus:border-primary/50 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-wider">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full h-11 bg-secondary/30 border border-border rounded-xl px-4 text-sm focus:border-primary/50 outline-none transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 rounded-xl text-sm font-bold mt-4"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        No school yet?{' '}
                        <Link href="/register" className="text-primary hover:underline font-bold">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>

            <footer className="py-8 text-center text-xs text-muted-foreground">
                &copy; 2026 EduFlow AI
            </footer>
        </div>
    )
}
