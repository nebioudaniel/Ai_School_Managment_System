import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    // Chapa sends a JSON body for webhooks/callbacks
    // However, sometimes it's better to verify via their API if you're not sure about the source.
    // For now, we trust the status in the body as per your current setup.

    try {
        const body = await req.json();
        const { tx_ref, status } = body;

        console.log(`Payment Callback received: ${tx_ref}, Status: ${status}`);

        if (status === "success") {
            // Find the school by tx_ref
            const school = await prisma.school.findUnique({
                where: { txRef: tx_ref }
            });

            if (school) {
                // Determine if this was an upgrade or initial registration
                // If it was an upgrade, 'lastPlan' might hold the target plan
                const finalPlan = school.lastPlan || school.plan;

                await prisma.school.update({
                    where: { id: school.id },
                    data: {
                        paid: true,
                        plan: finalPlan,
                        lastPlan: null // Clear the pending target plan
                    }
                });

                console.log(`Updated school ${school.name} to PAID on plan ${finalPlan}`);
            } else {
                console.error(`No school found for tx_ref: ${tx_ref}`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Payment Callback Error:", err);
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}
