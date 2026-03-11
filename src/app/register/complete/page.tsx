'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

import { getSchoolSlug } from '../actions'

export default function RegistrationCompletePage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tx_ref = searchParams.get('tx_ref')
    const [loading, setLoading] = React.useState(true)
    const [slug, setSlug] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function complete() {
            const schoolSlug = await getSchoolSlug()
            setSlug(schoolSlug)
            setLoading(false)
        }
        complete()
    }, [tx_ref])

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center py-20 px-6">
                <div className="w-full max-w-md space-y-8 text-center animate-in fade-in zoom-in duration-700">
                    {loading ? (
                        <div className="space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                            <h2 className="text-2xl font-bold">Verifying Payment...</h2>
                            <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">Transaction Ref: {tx_ref}</p>
                        </div>
                    ) : (
                        <>
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                <CheckCircle2 className="h-20 w-20 text-primary mx-auto relative animate-in zoom-in duration-500 delay-300 fill-primary/10" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold tracking-tight">Registration Complete!</h1>
                                <p className="text-muted-foreground">Your institution's account has been successfully set up and the plan has been activated.</p>
                            </div>

                            <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50 text-left">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">What's Next?</p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-sm">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-[10px]">1</div>
                                        <p>Access your school's dashboard</p>
                                    </li>
                                    <li className="flex gap-3 text-sm">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-[10px]">2</div>
                                        <p>Invite teachers and staff members</p>
                                    </li>
                                    <li className="flex gap-3 text-sm">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-[10px]">3</div>
                                        <p>Configure your institution settings</p>
                                    </li>
                                </ul>
                            </div>

                            <Button onClick={() => router.push(slug ? `/${slug}` : '/login')} size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
