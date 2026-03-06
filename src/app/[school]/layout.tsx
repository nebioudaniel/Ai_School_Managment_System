import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    CheckSquare,
    LineChart,
    Bell,
    Bot,
    Settings,
    LogOut,
    Building2
} from 'lucide-react'

// Define sidebars inside Layout since it's server-rendered
const roleNav = {
    school_admin: [
        { name: 'Dashboard', href: '', icon: LayoutDashboard },
        { name: 'Students', href: '/students', icon: GraduationCap },
        { name: 'Teachers', href: '/teachers', icon: Users },
        { name: 'Classes', href: '/classes', icon: BookOpen },
        { name: 'Assignments', href: '/assignments', icon: ClipboardList },
        { name: 'Attendance', href: '/attendance', icon: CheckSquare },
        { name: 'Grades', href: '/grades', icon: LineChart },
        { name: 'Announcements', href: '/announcements', icon: Bell },
        { name: 'AI Tools', href: '/ai', icon: Bot },
        { name: 'Settings', href: '/settings', icon: Settings },
    ],
    teacher: [
        { name: 'My Classes', href: '', icon: BookOpen },
        { name: 'Students', href: '/students', icon: GraduationCap },
        { name: 'Attendance', href: '/attendance', icon: CheckSquare },
        { name: 'Assignments', href: '/assignments', icon: ClipboardList },
        { name: 'Grades', href: '/grades', icon: LineChart },
        { name: 'AI Assistant', href: '/ai', icon: Bot },
    ],
    student: [
        { name: 'Classes', href: '', icon: BookOpen },
        { name: 'Assignments', href: '/assignments', icon: ClipboardList },
        { name: 'Grades', href: '/grades', icon: LineChart },
        { name: 'AI Tutor', href: '/ai', icon: Bot },
        { name: 'Announcements', href: '/announcements', icon: Bell },
    ],
    parent: [
        { name: 'Student Progress', href: '', icon: LineChart },
        { name: 'Attendance', href: '/attendance', icon: CheckSquare },
        { name: 'Grades', href: '/grades', icon: LineChart },
        { name: 'Announcements', href: '/announcements', icon: Bell },
    ]
}

export default async function SchoolLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ school: string }>
}) {
    const { school } = await params

    if (['register', 'login', 'pricing', 'api', '_next'].includes(school)) {
        // This layout shouldn't apply to core platform routes if they overlap,
        // Next.js routing should handle it perfectly since static paths take precedence.
        return <>{children}</>
    }

    const supabase = await createClient()

    // Verify school exists
    const { data: schoolData } = await supabase
        .from('schools')
        .select('id, name')
        .eq('slug', school)
        .single()

    if (!schoolData) {
        notFound()
    }

    // Check user session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        redirect('/login')
    }

    // Get user profile mapping
    const { data: profile } = await supabase
        .from('users')
        .select('role, school_id')
        .eq('id', user.id)
        .single()

    if (!profile || profile.school_id !== schoolData.id) {
        // Unauthorized to view this school
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Unauthorized Access</h2>
                    <p className="mb-4">You do not have permission to view {schoolData.name}.</p>
                    <form action={async () => {
                        'use server';
                        const s = await createClient()
                        await s.auth.signOut()
                        redirect('/login')
                    }}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Out</button>
                    </form>
                </div>
            </div>
        )
    }

    const navItems = roleNav[profile.role as keyof typeof roleNav] || []

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r flex flex-col h-full">
                <div className="p-4 border-b flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-900 truncate">{schoolData.name}</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={`/${school}${item.href}`}
                            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition"
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <form action={async () => {
                        'use server';
                        const s = await createClient()
                        await s.auth.signOut()
                        redirect('/login')
                    }}>
                        <button className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition">
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold capitalize">{profile.role.replace('_', ' ')} Portal</h1>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-medium">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
