"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/types/user";

export async function GetUserDetails() {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.findUnique({
        where: {
            clerkId: user.id,
        },
        include: {
            Portfolio: true,
        }
    })
}

export async function UpdateBalance(amount: number) {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.update({
        where: {
            clerkId: user.id,
        },
        data: {
            balance: {
                decrement: amount,
            }
        }
    })
}

export async function GetAllUsers() {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.findMany({
        include: {
            Portfolio: true,
        }
    })
}

export async function UpdateUser(userData: Partial<Pick<User, 'name' | 'email'>>) {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.update({
        where: {
            clerkId: user.id,
        },
        data: userData
    })
}

export async function UpdateType() {
    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.update({
        where: {
            clerkId: user.id,
        },
        data: {
            type: 'PRO'
        }
    })
}