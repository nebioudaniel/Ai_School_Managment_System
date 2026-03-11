'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowRight, BrainCircuit, Sparkles, CheckCircle2, ShieldCheck, Zap, LayoutDashboard, CreditCard, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
              <Sparkles className="h-3 w-3" />
              The AI Operating System for Schools
            </div>
            <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tight mb-6 leading-[1.1] text-foreground">
              Education management, <br />
              <span className="text-muted-foreground">reimagined with AI.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Automate administration, empower teachers, and engage students with a
              platform built for the future of learning.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-secondary/30 border border-border rounded-2xl">
                <input
                  type="email"
                  placeholder="Enter school email"
                  className="flex-1 w-full h-11 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground/50 font-medium"
                />
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-bold shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <p className="text-xs text-muted-foreground font-medium">
                  No credit card required.
                </p>
                <Link href="/login" className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                  Go to your school
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Simple Mockup Container */}
          <div className="mt-20 max-w-6xl mx-auto relative px-6">
            <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-4 shadow-2xl">
              <div className="aspect-[16/9] rounded-2xl bg-background/50 overflow-hidden relative border border-border">
                <div className="absolute top-0 left-0 bottom-0 w-48 border-r border-border p-4 space-y-3 hidden md:block">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-8 w-full bg-secondary/50 rounded-lg" />
                  ))}
                </div>
                <div className="md:ml-48 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-32 bg-primary/5 border border-primary/10 rounded-2xl p-6">
                        <div className="h-8 w-8 rounded-lg bg-primary/20 mb-4" />
                        <div className="h-4 w-2/3 bg-foreground/10 rounded-full" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 h-64 bg-secondary/20 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureItem
                icon={<Zap className="h-5 w-5 text-primary" />}
                title="Lightning Fast"
                desc="A modern tech stack ensures sub-second responses for every action."
              />
              <FeatureItem
                icon={<BrainCircuit className="h-5 w-5 text-primary" />}
                title="AI Powered"
                desc="Integrated LLMs help generate lesson plans and automate grading."
              />
              <FeatureItem
                icon={<ShieldCheck className="h-5 w-5 text-primary" />}
                title="Secure by Design"
                desc="Enterprise-grade encryption protecting every byte of student data."
              />
            </div>
          </div>
        </section>

        {/* Social Proof Section (Simplified) */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16">Trusted by 500+ Institutions.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40 grayscale pointer-events-none">
              <div className="flex items-center justify-center font-heading text-2xl font-black">UNIVERSITY</div>
              <div className="flex items-center justify-center font-heading text-2xl font-black">ACADEMY</div>
              <div className="flex items-center justify-center font-heading text-2xl font-black">SCHOOL</div>
              <div className="flex items-center justify-center font-heading text-2xl font-black">INSTITUTE</div>
            </div>
          </div>
        </section>

        {/* Simple FAQ Section */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <SimpleFAQ
                q="Is migrating difficult?"
                a="No, our team handles all data imports from your existing systems for free."
              />
              <SimpleFAQ
                q="Do you support local currencies?"
                a="Yes, we support multi-currency payments including Stripe and local African payment gateways."
              />
              <SimpleFAQ
                q="Can we cancel anytime?"
                a="Of course. There are no long-term contracts. You stay because you love the platform."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto p-12 md:p-24 rounded-[3rem] bg-primary text-primary-foreground">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Ready to start?</h2>
            <Link href="/register">
              <Button variant="secondary" size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold">
                Create Your Portal
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

function SimpleFAQ({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex justify-between items-center bg-card/30 hover:bg-card/50 transition-colors"
      >
        <span className="font-bold">{q}</span>
        <div className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</div>
      </button>
      {open && <div className="p-6 pt-0 text-muted-foreground border-t border-border bg-card/30">{a}</div>}
    </div>
  )
}
