import { Portfolio } from "./portfolio";

export interface User {
    id: string;
    clerkId: string;
    email: string;
    name: string | null;
    avatar: string | null;
    type: UserType;
    balance: number | null;
    createdAt: Date;
    Portfolio: Array<Portfolio>
}

export type UserType = "FREE" | "PRO";