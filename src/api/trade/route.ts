"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCoinsList() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.COINGEKO_API_KEY || "",
        },
    } as const;

    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad", options);

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}

export async function getChartData(selectedCoin: string) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.COINGEKO_API_KEY || "",
        },
    } as const;

    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=cad&days=30&interval=daily&precision=2`,
        options
    );

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}

export async function tradeCoin(symbol: string, quantity: number, purchasePrice: number) {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.portfolio.create({
        data: {
            userId: user.id,
            symbol: symbol,
            quantity: quantity,
            purchasePrice: purchasePrice,
        }
    })
}