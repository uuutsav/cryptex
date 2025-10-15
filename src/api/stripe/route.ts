'use server';

import { Plan } from '@/types/plan';
import Stripe from 'stripe';
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function getPlan() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('Stripe secret key is not defined');
    }

    const user = await currentUser()

    if (!user || !user.emailAddresses?.length) {
        return null;
    }

    try {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
            active: true,
            type: 'recurring',
        });
        const plan: Plan = {
            id: prices.data[0].id,
            price: prices.data[0].unit_amount || 0,
            interval: prices.data[0].recurring?.interval || '',
            price_id: prices.data[0].id,
        };
        return plan;
    } catch (error) {
        console.error('Error fetching prices:', error);
        return [];
    }
}