'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
// @ts-ignore
import { hashPassword } from "better-auth/crypto"

export async function submitSchoolInfo(data: {
    schoolName: string
    adminName: string
    password?: string
    slug?: string
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("You must be signed in to submit school info")
    }

    const { user } = session

    // 1. Update user name
    await prisma.user.update({
        where: { id: user.id },
        data: { name: data.adminName }
    })

    // 2. Set password if provided
    if (data.password) {
        const hashedPassword = await hashPassword(data.password)

        // Upsert the credential account
        await prisma.account.upsert({
            where: {
                // In better-auth, the unique constraint is usually on (providerId, accountId)
                // Since this is a manual prisma call, we'll find by userId and providerId first
            },
            // Wait, prisma unique constraint for Account is composite usually, but 
            // in our schema it's just 'id'. We'll find by filter.
            create: {
                userId: user.id,
                providerId: "credential",
                accountId: user.id,
                password: hashedPassword
            },
            update: {
                password: hashedPassword
            },
            // @ts-ignore - we'll use a more robust way since we don't have the composite key in schema
        }).catch(async () => {
            // Fallback for missing unique constraint on multiple fields
            const existing = await prisma.account.findFirst({
                where: { userId: user.id, providerId: "credential" }
            })
            if (existing) {
                await prisma.account.update({
                    where: { id: existing.id },
                    data: { password: hashedPassword }
                })
            } else {
                await prisma.account.create({
                    data: {
                        userId: user.id,
                        providerId: "credential",
                        accountId: user.id,
                        password: hashedPassword
                    }
                })
            }
        })
    }

    // 3. Create or update school info
    const generatedSlug = data.slug || data.schoolName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')

    await prisma.school.upsert({
        where: { userId: user.id },
        create: {
            name: data.schoolName,
            slug: data.slug ? generatedSlug : `${generatedSlug}-${Math.random().toString(36).substring(2, 6)}`,
            adminName: data.adminName,
            email: user.email,
            userId: user.id,
            plan: "starter", // Default to starter
            paid: false
        },
        update: {
            name: data.schoolName,
            slug: generatedSlug,
            adminName: data.adminName,
        }
    })

    return { success: true }
}

export async function getSchoolSlug() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return null

    const school = await prisma.school.findUnique({
        where: { userId: session.user.id }
    })

    return school?.slug || null
}
export async function updateSchoolPlanSelection(plan: string, txRef: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("Unauthorized")
    }

    await prisma.school.update({
        where: { userId: session.user.id },
        data: { plan, txRef }
    })

    return { success: true }
}
