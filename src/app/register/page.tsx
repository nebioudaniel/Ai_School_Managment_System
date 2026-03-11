'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle2, ArrowLeft, Mail, Lock, School, GraduationCap, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/layout/navbar'
import { authClient } from '@/lib/auth-client'
import { submitSchoolInfo, updateSchoolPlanSelection } from './actions'

type Step = 'AUTH' | 'VERIFY' | 'INFO' | 'PLAN' | 'PAYMENT'

const plans = {
    BASIC: {
        name: 'Starter',
        price: 2500,
        features: [
            '250 Students',
            '10 Teachers',
            '2 Main Teachers',
            '1 Admin Account',
            '250 Families',
            '20,000 AI Tokens Daily',
            'Limited Support'
        ]
    },
    PRO: {
        name: 'Professional',
        price: 5500,
        features: [
            '400 Students',
            '30 Teachers',
            '15 Main Teachers',
            '10 Admins',
            '410 Families',
            '50,000 AI Tokens Daily',
            'Priority Support'
        ]
    },
    ENTERPRISE: {
        name: 'Institutional',
        price: 9500,
        features: [
            '700 Students',
            '50 Teachers',
            '25 Main Teachers',
            '20 Admins',
            '750 Families',
            '100,000 AI Tokens Daily',
            '24/7 Dedicated Support'
        ]
    }
}

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>('AUTH')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    const [schoolInfo, setSchoolInfo] = useState({
        name: '',
        adminName: '',
        slug: ''
    })
    const [selectedPlan, setSelectedPlan] = useState('PRO')

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [resendTimer])

    function startTimer() {
        setResendTimer(60)
    }

    async function handleSendOTP(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: 'sign-in'
        })
        if (error) {
            setError(error.message || 'Failed to send OTP')
        } else {
            startTimer()
            setStep('VERIFY')
        }
        setLoading(false)
    }

    async function handleResendOTP() {
        if (resendTimer > 0) return
        setLoading(true)
        setError(null)
        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: 'sign-in'
        })
        if (error) {
            setError(error.message || 'Failed to resend OTP')
        } else {
            startTimer()
        }
        setLoading(false)
    }

    async function handleVerifyOTP() {
        setLoading(true)
        setError(null)
        const { error } = await authClient.signIn.emailOtp({
            email,
            otp: otp,
        })
        if (error) {
            setError(error.message || 'Invalid OTP')
        } else {
            setStep('INFO')
        }
        setLoading(false)
    }

    async function handleSaveInfo(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { success } = await submitSchoolInfo({
                schoolName: schoolInfo.name,
                adminName: schoolInfo.adminName,
                password: password,
                slug: schoolInfo.slug || undefined
            })

            if (success) {
                setStep('PLAN')
            } else {
                setError('Failed to save information. Please try again.')
            }
        } catch (err: any) {
            console.error('Save Info Error:', err)
            setError(err.message || 'Failed to save information')
        }
        setLoading(false)
    }

    async function handlePayment() {
        setLoading(true)
        setError(null)

        try {
            const planData = plans[selectedPlan as keyof typeof plans]
            const tx_ref = `tx-${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, '')}`

            await updateSchoolPlanSelection(selectedPlan, tx_ref)

            setStep('PAYMENT')

            setTimeout(() => {
                try {
                    // @ts-ignore
                    const ChapaCheckout = window.ChapaCheckout;
                    if (!ChapaCheckout) {
                        setError('Chapa SDK not loaded yet. Please try again.')
                        setLoading(false)
                        setStep('PLAN')
                        return
                    }

                    const chapa = new ChapaCheckout({
                        publicKey: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || '',
                        amount: planData.price.toString(),
                        currency: 'ETB',
                        availablePaymentMethods: ['telebirr', 'cbebirr', 'ebirr', 'mpesa', 'chapa'],
                        customizations: {
                            buttonText: 'Pay Now',
                            styles: `
                                .chapa-pay-button { 
                                    width: 100%;
                                    height: 56px;
                                    border-radius: 12px;
                                    background-color: #22c55e;
                                    color: white;
                                    font-weight: 800;
                                    font-size: 1.125rem;
                                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                                    border: none;
                                    text-transform: uppercase;
                                    letter-spacing: 0.1em;
                                    box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
                                    margin-top: 10px;
                                }
                                .chapa-pay-button:hover {
                                    background-color: #16a34a;
                                    transform: translateY(-2px);
                                    box-shadow: 0 20px 25px -5px rgba(34, 197, 94, 0.4);
                                }
                                .chapa-pay-button:active {
                                    transform: scale(0.98);
                                }
                                .chapa-input, .chapa-phone-input {
                                    border-radius: 12px !important;
                                    border: 1px solid hsl(var(--border)) !important;
                                    background: hsl(var(--secondary) / 0.5) !important;
                                    color: hsl(var(--foreground)) !important;
                                    padding: 12px 16px !important;
                                    font-size: 1rem !important;
                                    transition: all 0.2s !important;
                                }
                                .chapa-phone-input-wrapper {
                                    border-radius: 12px !important;
                                    border: 1px solid hsl(var(--border)) !important;
                                    background: hsl(var(--secondary) / 0.5) !important;
                                    height: 56px !important;
                                    box-sizing: border-box !important;
                                    margin-bottom: 24px !important;
                                    display: flex !important;
                                    align-items: center !important;
                                    overflow: hidden !important;
                                }
                                .chapa-phone-prefix {
                                    background: transparent !important;
                                    border-right: 1px solid hsl(var(--border)) !important;
                                    color: hsl(var(--foreground)) !important;
                                    font-weight: 700 !important;
                                    height: 100% !important;
                                    padding: 0 15px !important;
                                    display: flex !important;
                                    align-items: center !important;
                                }
                                .chapa-payment-methods-grid {
                                    gap: 12px !important;
                                    margin: 24px 0 !important;
                                    display: flex !important;
                                    flex-wrap: wrap !important;
                                }
                                .chapa-payment-method {
                                    background: hsl(var(--secondary) / 0.5) !important;
                                    border: 2px solid transparent !important;
                                    border-radius: 16px !important;
                                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                                    padding: 12px !important;
                                    flex: 1 1 60px !important;
                                    min-width: 60px !important;
                                    display: flex !important;
                                    flex-direction: column !important;
                                    align-items: center !important;
                                }
                                .chapa-payment-method.chapa-selected {
                                    background: #22c55e15 !important;
                                    border-color: #22c55e !important;
                                    transform: scale(1.05) !important;
                                    box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.2) !important;
                                }
                                .chapa-payment-name {
                                    font-size: 10px !important;
                                    font-weight: 800 !important;
                                    text-transform: uppercase !important;
                                    letter-spacing: 0.1em !important;
                                    color: hsl(var(--foreground)) !important;
                                    margin-top: 6px !important;
                                    text-align: center !important;
                                }
                                .chapa-error {
                                    background: hsl(var(--destructive) / 0.1) !important;
                                    color: hsl(var(--destructive)) !important;
                                    padding: 12px !important;
                                    border-radius: 8px !important;
                                    font-size: 13px !important;
                                    font-weight: 600 !important;
                                    margin-bottom: 16px !important;
                                    text-align: center !important;
                                }
                            `
                        },
                        callbackUrl: `${window.location.origin}/api/payments/callback`,
                        returnUrl: `${window.location.origin}/register/complete?tx_ref=${tx_ref}`,
                        onSuccessfulPayment: (data: any) => {
                            console.log('Payment Success:', data)
                            router.push(`/register/complete?tx_ref=${tx_ref}`)
                        },
                        onPaymentFailure: (data: any) => {
                            console.error('Payment Failed:', data)
                            setError('Payment failed. Please check your details and try again.')
                            setLoading(false)
                        },
                        onClose: () => {
                            console.log('Payment window closed')
                            setLoading(false)
                        }
                    })

                    chapa.initialize('chapa-inline-form')
                    setLoading(false)
                } catch (err) {
                    console.error('Chapa Init Error:', err)
                    setError('Failed to initialize payment gateway.')
                    setLoading(false)
                    setStep('PLAN')
                }
            }, 100)
        } catch (err: any) {
            console.error('Plan Selection Error:', err)
            setError(err.message || 'Failed to update plan selection')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <Script
                src="https://js.chapa.co/v1/inline.js"
                strategy="afterInteractive"
            />

            <main className="flex-1 flex flex-col items-center py-20 px-6">
                <div className="w-full max-w-2xl space-y-12">
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                            {step === 'AUTH' && "Get Started"}
                            {step === 'VERIFY' && "Verify Identity"}
                            {step === 'INFO' && "Institutional Info"}
                            {step === 'PLAN' && "Choose your plan"}
                            {step === 'PAYMENT' && "Review & Pay"}
                        </h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            {step === 'AUTH' && "Enter your email to begin setup."}
                            {step === 'VERIFY' && `We sent a code to ${email}`}
                            {step === 'INFO' && "Tell us about your school."}
                            {step === 'PLAN' && "Select the best fit for your institution."}
                            {step === 'PAYMENT' && "One final step to activate your workspace."}
                        </p>
                    </div>

                    <div className="bg-secondary/10 p-1 rounded-2xl flex relative overflow-hidden ring-1 ring-border/50">
                        <div
                            className="absolute top-1 bottom-1 bg-background rounded-xl shadow-sm transition-all duration-500"
                            style={{
                                left: step === 'AUTH' ? '4px' : step === 'VERIFY' ? '20%' : step === 'INFO' ? '40%' : step === 'PLAN' ? '60%' : '80%',
                                width: '19%'
                            }}
                        />
                        {['AUTH', 'VERIFY', 'INFO', 'PLAN', 'PAYMENT'].map((s, i) => (
                            <div key={s} className={`flex-1 text-center py-2 text-[10px] font-bold z-10 transition-colors duration-500 uppercase tracking-widest ${step === s ? 'text-primary' : 'text-muted-foreground/50'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
                        {error && (
                            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                                {error}
                            </div>
                        )}

                        {step === 'AUTH' && (
                            <form onSubmit={handleSendOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input
                                            type="email"
                                            placeholder="admin@school.com"
                                            className="h-14 pl-12 rounded-xl bg-secondary/20 border-border/50 focus:bg-background transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading} size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
                                </Button>
                            </form>
                        )}

                        {step === 'VERIFY' && (
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Enter 6-digit code"
                                        className="h-16 text-center text-3xl font-bold tracking-[0.5em] rounded-xl bg-secondary/20"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Button onClick={handleVerifyOTP} disabled={loading || otp.length !== 6} size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                                        {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                                    </Button>
                                    <button
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0 || loading}
                                        className="w-full text-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                                    >
                                        {resendTimer > 0
                                            ? `Resend in ${resendTimer}s`
                                            : "Didn't receive a code? Resend"}
                                    </button>

                                    <button onClick={() => setStep('AUTH')} className="w-full text-center text-sm text-muted-foreground hover:text-primary font-medium">
                                        Wrong email? Change it
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 'INFO' && (
                            <form onSubmit={handleSaveInfo} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">School Name</label>
                                        <Input
                                            placeholder="Global Academy"
                                            value={schoolInfo.name}
                                            onChange={(e) => {
                                                const name = e.target.value
                                                const autoSlug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
                                                setSchoolInfo({ ...schoolInfo, name, slug: autoSlug })
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Custom Portal URL (Optional)</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="my-school"
                                                value={schoolInfo.slug}
                                                onChange={(e) => setSchoolInfo({ ...schoolInfo, slug: e.target.value.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '') })}
                                            />
                                        </div>
                                        <p className="text-[10px] font-medium text-muted-foreground italic ml-1 flex items-center gap-1.5">
                                            Your URL: <span className="text-primary font-bold">hulugar.com/{schoolInfo.slug || 'your-school'}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Admin Full Name</label>
                                        <Input
                                            placeholder="Abebe Bikila"
                                            value={schoolInfo.adminName}
                                            onChange={(e) => setSchoolInfo({ ...schoolInfo, adminName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <div className="flex justify-between items-end ml-1">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Create Admin Password</label>
                                            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{email}</span>
                                        </div>
                                        <div className="relative group">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pr-12"
                                                required
                                                minLength={8}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground italic ml-1">Minimum 8 characters. You'll use this to log in.</p>
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading} size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Next: Choose Plan'}
                                </Button>
                            </form>
                        )}

                        {step === 'PLAN' && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(plans).map(([key, plan]) => (
                                        <label key={key} className={`relative flex flex-col p-6 bg-secondary/20 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:border-primary/40 ${selectedPlan === key ? 'border-primary bg-primary/[0.04] ring-1 ring-primary' : 'border-transparent'}`}>
                                            <input type="radio" name="plan" value={key} className="sr-only" onChange={() => setSelectedPlan(key)} checked={selectedPlan === key} />
                                            <div className="mb-5">
                                                <p className="text-[10px] font-black text-foreground/50 uppercase tracking-[0.2em] mb-1.5">{plan.name}</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold tracking-tight text-foreground">{plan.price.toLocaleString()}</span>
                                                    <span className="text-[10px] text-muted-foreground font-bold italic">ETB/mo</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 flex-1 mb-1">
                                                {plan.features.map((f, i) => (
                                                    <li key={i} className="text-[11px] text-foreground/70 flex items-center gap-2.5 font-medium">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </label>
                                    ))}
                                </div>
                                <Button onClick={handlePayment} disabled={loading} size="lg" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                                    {loading ? <Loader2 className="animate-spin" /> : `Continue to Payment - ${plans[selectedPlan as keyof typeof plans].price.toLocaleString()} ETB`}
                                </Button>
                            </div>
                        )}

                        {step === 'PAYMENT' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Selected Plan</p>
                                            <p className="text-xl font-bold">{plans[selectedPlan as keyof typeof plans].name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Price</p>
                                            <p className="text-xl font-bold text-primary">{plans[selectedPlan as keyof typeof plans].price.toLocaleString()} ETB</p>
                                        </div>
                                    </div>

                                    <div className="relative min-h-[120px] flex items-center justify-center">
                                        {loading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10 rounded-xl">
                                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            </div>
                                        )}
                                        <div id="chapa-inline-form" className="w-full"></div>
                                    </div>
                                </div>
                                <button onClick={() => setStep('PLAN')} className="w-full text-center text-sm text-muted-foreground hover:text-primary font-medium">
                                    Change plan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
