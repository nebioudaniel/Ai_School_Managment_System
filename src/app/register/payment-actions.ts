'use server'

/**
 * Note: Payment initialization is now handled on the client via Chapa Inline JS.
 * This file can be used for server-side verification after payment.
 */
export async function verifyPaymentStatus(tx_ref: string) {
    const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
    if (!CHAPA_SECRET_KEY) {
        return { error: "Chapa Secret Key is not configured." };
    }

    try {
        const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
            },
        });

        const result = await response.json();
        return result;
    } catch (err) {
        return { error: "Failed to verify transaction." };
    }
}
