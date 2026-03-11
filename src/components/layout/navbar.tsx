'use client'

import React from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="text-xl font-heading font-bold tracking-tight text-foreground">EduFlow</span>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="h-4 w-px bg-border/50 mx-2 hidden sm:block" />
                    <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Login
                    </Link>
                    <Link href="/register">
                        <Button size="sm" className="rounded-full px-5 font-semibold">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
