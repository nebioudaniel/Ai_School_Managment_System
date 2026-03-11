'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required.' }
    }

    try {
        // Since better-auth handles the session via cookies on the client side login,
        // we'll use the API to verify credentials or just find the school for this email first.

        // Find the user and their school
        const user = await prisma.user.findUnique({
            where: { email },
            include: { school: true }
        })

        if (!user) {
            return { error: 'User not found.' }
        }

        if (!user.school) {
            return { error: 'No school associated with this account.' }
        }

        // We return the slug so the client-side can redirect after successful authClient sign-in
        return { success: true, slug: user.school.slug }

    } catch (err: any) {
        console.error('Login Action Error:', err)
        return { error: 'Authentication failed.' }
    }
}
