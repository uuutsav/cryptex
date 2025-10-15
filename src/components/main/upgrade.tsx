"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { getPlan } from "@/api/stripe/route";
import { Plan } from "@/types/plan";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const pro = {
  id: "pro",
  title: "Upgrade to Pro",
  desc: "Level up with advanced simulations, analytics, and personalized insights.",
  badge: "Most Popular",
  buttonText: "Upgrade",
  features: [
    "Advanced crypto portfolio simulations",
    "Real-time market analysis tools",
    "Priority email support",
    "Unlimited simulated portfolios",
    "In-depth analytics & performance tracking",
    "Customizable trading strategies",
    "Team collaboration & strategy sharing",
    "Exclusive educational resources",
  ],
  link: "",
};

const Upgrade = () => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const data = await getPlan();
        setPlan(Array.isArray(data) ? data : data ? [data] : []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    }
    fetchPlan();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    if (!stripePromise) return;
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `${window.location.origin}/success-subscription`,
      cancelUrl: `${window.location.origin}/cancel-subscription`,
    });
    if (response.error) {
      console.error("Error:", response.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex items-center gap-1">
          <Zap fill="#facc15" size={20} color="#facc15" />
          Upgrade
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-[#121212]">
        <DialogHeader>
          <DialogTitle>{pro.title}</DialogTitle>
          <DialogDescription>{pro.desc}</DialogDescription>
        </DialogHeader>
        <hr
          className="shrink-0 border-none w-full h-px bg-border"
          role="separator"
        />
        <div className="relative flex flex-col flex-1 align-top w-full h-full break-words text-left gap-4">
          <div className="flex items-end gap-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl md:text-4xl font-bold">
                ${plan.length > 0 ? plan[0].price / 100 : 0}
              </span>
              <span className="text-lg text-muted-foreground font-medium font-heading">
                per month
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-2">
            {pro.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-primary"
                />
                <p className="text-sm md:text-base text-muted-foreground">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="flex items-center justify-end">
          <Button
            asChild
            variant={"default"}
            className="hover:scale-100 hover:translate-y-0 shadow-none"
            onClick={() =>
              handleSubscribe(plan.length > 0 ? plan[0].price_id : "")
            }
          >
            <Link href={pro.link}>{pro.buttonText}</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Upgrade;
