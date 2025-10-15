"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GetUserById() {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.findUnique({
        where: {
            clerkId: user.id,
        },
    })
}

export async function CreateUser() {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    return await prisma.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.fullName ? user.fullName : "",
            avatar: user.imageUrl,
            type: "FREE",
            balance: 10000,
        }
    })
}