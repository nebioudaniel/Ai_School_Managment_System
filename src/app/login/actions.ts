'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function loginUser(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required.' }
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (authError || !authData.user) {
        return { error: authError?.message || 'Invalid login credentials.' }
    }

    // Get the user's role and school_id
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('school_id, role, schools(slug)')
        .eq('id', authData.user.id)
        .single()

    if (userError || !userData) {
        return { error: 'User profile not found.' }
    }

    revalidatePath('/', 'layout')

    // Support school slug redirection
    const slug = (userData as any).schools?.slug || 'error'

    return { success: true, slug }
}
