import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Users, LayoutDashboard, BrainCircuit, CreditCard, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">Hulubet</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center bg-slate-100/50 px-6 py-2.5 rounded-full border border-slate-200">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">Log In</Link>
            <Link href="/register">
              <Button className="rounded-full shadow-lg hover:shadow-xl transition-all font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 px-6">
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-semibold mb-8 border border-blue-200">
              <Sparkles className="h-4 w-4" />
              The Next-Gen School Management OS
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900">
              Modernize your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                School Operations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Hulubet gives you everything you need in one perfectly designed platform. Manage students, teachers, grades, and supercharge education with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg bg-white/50 backdrop-blur border-slate-200 hover:bg-white hover:text-blue-600 transition-all">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Everything You Need. <br className="hidden md:block" /> Beautifully Integrated.</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">A unified, lightning-fast platform to handle admissions, attendance, communicating with parents, and AI-assisted teaching.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<LayoutDashboard className="h-6 w-6 text-blue-600" />}
                title="Unified Portals"
                description="Custom, modern dashboards for Admins, Teachers, Students, and Parents all tightly integrated."
                bg="bg-blue-50"
              />
              <FeatureCard
                icon={<BrainCircuit className="h-6 w-6 text-indigo-600" />}
                title="DeepSeek AI Assistant"
                description="Automate lesson plans, generate quizzes, and speed up grading with our built-in intelligence."
                bg="bg-indigo-50"
              />
              <FeatureCard
                icon={<CreditCard className="h-6 w-6 text-emerald-600" />}
                title="Chapa Payments"
                description="Seamlessly collect tuitions and fees using modern and secure local payment systems."
                bg="bg-emerald-50"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto font-medium">Choose the perfect plan for your school's size.</p>

            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <PricingCard
                name="Small Plan"
                students="Up to 200 students"
                teachers="Up to 20 teachers"
                price="500 ETB"
              />
              <PricingCard
                name="Medium Plan"
                students="Up to 800 students"
                teachers="Up to 80 teachers"
                price="1,500 ETB"
                isPopular
              />
              <PricingCard
                name="Large Plan"
                students="800+ students"
                teachers="Unlimited teachers"
                price="3,000 ETB"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Hulubet</span>
          </div>
          <p className="text-slate-500 font-medium">&copy; {new Date().getFullYear()} Hulubet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, bg }: { icon: React.ReactNode, title: string, description: string, bg: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`mb-6 ${bg} p-4 w-16 h-16 rounded-2xl flex items-center justify-center ring-1 ring-inset ring-black/5`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium">{description}</p>
    </div>
  )
}

function PricingCard({ name, students, teachers, price, isPopular }: { name: string, students: string, teachers: string, price: string, isPopular?: boolean }) {
  return (
    <div className={`p-8 rounded-3xl bg-white transition-all duration-300 ${isPopular ? 'border-2 border-blue-600 shadow-2xl shadow-blue-900/10 scale-105 z-10 relative' : 'border border-slate-200 shadow-sm hover:shadow-xl'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 text-slate-900">{name}</h3>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-5xl font-black tracking-tighter text-slate-900">{price}</span>
        <span className="text-lg text-slate-500 font-bold">/mo</span>
      </div>

      <ul className="space-y-4 mb-8 font-medium text-slate-700">
        <li className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-blue-600 stroke-[3]" />
          </div>
          {students}
        </li>
        <li className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-blue-600 stroke-[3]" />
          </div>
          {teachers}
        </li>
        <li className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-blue-600 stroke-[3]" />
          </div>
          Custom School URL
        </li>
        <li className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowRight className="h-3 w-3 text-blue-600 stroke-[3]" />
          </div>
          AI Features Included
        </li>
      </ul>

      <Link href="/register" className="block w-full">
        <Button
          variant={isPopular ? 'default' : 'outline'}
          className={`w-full h-12 rounded-xl text-md font-bold ${isPopular ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25' : 'hover:bg-slate-50 border-slate-300'}`}
        >
          {isPopular ? 'Get Started Now' : 'Start Trial'}
        </Button>
      </Link>
    </div>
  )
}
