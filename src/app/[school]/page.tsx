import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, BookOpen, AlertCircle } from 'lucide-react'

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ school: string }>
}) {
    const { school } = await params
    const supabase = await createClient()

    // Get User Profile
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
        .from('users')
        .select('role, school_id')
        .eq('id', user.id)
        .single()

    if (!profile) return null

    // Admin Dashboard
    if (profile.role === 'school_admin') {
        // In a real app we'd fetch counts from Supabase
        // const { count: studentsCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student').eq('school_id', profile.school_id)
        const stats = [
            { title: 'Total Students', value: '12', icon: GraduationCap },
            { title: 'Total Teachers', value: '4', icon: Users },
            { title: 'Total Classes', value: '8', icon: BookOpen },
            { title: 'Avg Attendance', value: '94%', icon: AlertCircle },
        ]

        return (
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">Admin Overview</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">No recent announcements.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-blue-900 rounded">
                                Performance is trending up across all grades. AI Tutor engagement rose by 15% this week.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Teacher Dashboard
    if (profile.role === 'teacher') {
        return (
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Students</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">120</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pending grading</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Use AI Teaching Assistant</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-gray-600">Generate lesson plans, quizzes, and grading feedback instantly using DeepSeek AI.</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Open AI Assistant</button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Student Dashboard
    if (profile.role === 'student') {
        return (
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">Student Dashboard</h2>
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-900">AI Tutor Chat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-blue-800">Ask the AI tutor for help with math problems, essay outlines, and complex science concepts.</p>
                        <button className="bg-white text-blue-800 border-blue-300 border px-4 py-2 rounded-lg font-medium hover:bg-blue-50">Chat with Tutor</button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <div>Welcome to your dashboard</div>
}
