'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function registerSchool(formData: FormData) {
    const supabase = await createClient()

    const schoolName = formData.get('schoolName') as string
    const adminName = formData.get('adminName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const plan = formData.get('plan') as string

    if (!schoolName || !email || !password || !adminName) {
        return { error: 'All fields are required.' }
    }

    const slug = generateSlug(schoolName)

    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: adminName,
            }
        }
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authData.user) {
        return { error: 'Failed to create user.' }
    }

    // 2. Create the school
    const { data: schoolData, error: schoolError } = await supabase
        .from('schools')
        .insert([
            { name: schoolName, slug, plan }
        ])
        .select()
        .single()

    if (schoolError) {
        return { error: 'Failed to create school workspace. ' + schoolError.message }
    }

    // 3. Create the user record linked to school with role 'school_admin'
    const { error: userError } = await supabase
        .from('users')
        .insert([
            {
                id: authData.user.id,
                name: adminName,
                email,
                role: 'school_admin',
                school_id: schoolData.id
            }
        ])

    if (userError) {
        // Note: in a real system we should handle rollback or rely on triggers
        return { error: 'Failed to complete registration profile.' }
    }

    revalidatePath('/', 'layout')

    return { success: true, slug: schoolData.slug }
}
