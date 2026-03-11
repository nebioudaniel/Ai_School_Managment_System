import React from 'react'
import Link from 'next/link'
import { GraduationCap, Linkedin, Twitter, ShieldCheck, Zap, Award } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-background text-foreground pt-24 pb-12 px-6 border-t border-border font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-8 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="flex items-center gap-2 mb-8 group">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <span className="text-2xl font-heading font-black tracking-tighter italic">EduFlow</span>
                            </Link>

                            <p className="max-w-md text-muted-foreground mb-10 leading-relaxed">
                                Empowering educational institutions with AI-driven tools for administration, teaching, and learning.
                            </p>

                            <div className="flex gap-4 mb-10">
                                <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                                    <Twitter className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-8">
                            <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                <div className="flex items-center justify-center w-5 h-5 rounded bg-secondary border border-border font-black text-foreground">A</div>
                                <span>Y Combinator Company</span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                <ShieldCheck className="h-5 w-5 text-[#3b82f6]" />
                                <span>SOC Type 2 Certified</span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Award className="h-5 w-5 text-[#8b5cf6]" />
                                <span>ISO/IEC 27001 Certified</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <FooterColumn title="Platform">
                            <FooterLink href="/login">Login</FooterLink>
                            <FooterLink href="/register">Register</FooterLink>
                            <FooterLink href="/">Home</FooterLink>
                        </FooterColumn>

                        <FooterColumn title="Resources">
                            <FooterLink href="mailto:support@eduflow.ai">Help Center</FooterLink>
                            <FooterLink href="mailto:contact@eduflow.ai">Contact Us</FooterLink>
                        </FooterColumn>
                    </div>
                </div>

                <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground text-xs font-medium">
                    <p>&copy; 2026 EduFlow AI, Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-foreground transition-colors">System Status</a>
                        <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</h4>
            <div className="flex flex-col gap-2.5">
                {children}
            </div>
        </div>
    )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            {children}
        </Link>
    )
}
