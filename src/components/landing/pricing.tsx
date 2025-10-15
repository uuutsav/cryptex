import React from "react";
import Container from "../global/container";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import SectionHeader from "../ui/section-header";

type plan = {
  id: string;
  title: string;
  desc: string;
  monthlyPrice: number;
  badge: string;
  buttonText: string;
  features: string[];
  link: string;
};

const plans: plan[] = [
  {
    id: "free",
    title: "Free",
    desc: "Start your crypto learning journey with essential tools and simulations.",
    monthlyPrice: 0,
    badge: "",
    buttonText: "Get Started",
    features: [
      "Basic crypto portfolio simulation",
      "Access to live market data",
      "Community-driven support",
      "1 simulated portfolio limit",
      "Standard performance tracking",
      "Beginner trading strategies",
    ],
    link: "/signup",
  },
  {
    id: "pro",
    title: "Pro",
    desc: "Level up with advanced simulations, analytics, and personalized insights.",
    monthlyPrice: 10,
    badge: "Most Popular",
    buttonText: "Upgrade to Pro",
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
    link: "/signup",
  },
];

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="p-4 max-w-7xl mx-auto flex-col items-center justify-center pt-20 md:pt-32"
    >
      <SectionHeader
        badge="Pricing"
        title1="Flexible Pricing,"
        title2="For Every Investor"
        description="Choose the plan that fits your learning journey. Whether you're
            exploring crypto or building an advanced strategy, Cryptex has you
            covered—risk-free."
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-14 md:px-40">
          {plans.map((plan, index) => (
            <Plan key={index} {...plan} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const Plan = ({
  id,
  title,
  desc,
  monthlyPrice,
  badge,
  buttonText,
  features,
  link,
}: plan) => {
  return (
    <div
      className={cn(
        "w-full border relative p-3 rounded-lg lg:rounded-xl flex flex-col bg-gradient-to-br from-primary/5 to-primary/10",
        id === "pro" ? "border-primary" : ""
      )}
    >
      {id === "pro" && (
        <div className="max-w-fit min-w-min inline-flex items-center whitespace-nowrap px-1 h-7 rounded-full bg-gradient-to-r from-primary to-blue-500 absolute -top-3 left-1/2 -translate-x-1/2 select-none">
          <span className="flex-1 text-sm px-2 font-medium bg-gradient-to-r from-blue-300 via-blue-50 to-blue-300 bg-[length:200%_100%] bg-clip-text text-transparent animate-background-shine">
            {badge}
          </span>
        </div>
      )}
      <div className="flex flex-col p-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-secondary">{desc}</p>
      </div>
      <hr
        className="shrink-0 border-none w-full h-px bg-border"
        role="separator"
      />
      <div className="relative flex flex-col flex-1 align-top w-full p-3 h-full break-words text-left gap-4">
        <div className="flex items-end gap-2">
          <div className="flex items-end gap-2">
            <span className="text-3xl md:text-4xl font-bold">
              ${monthlyPrice}
            </span>
            <span className="text-lg text-muted-foreground font-medium font-heading">
              per month
            </span>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon aria-hidden="true" className="w-5 h-5 text-primary" />
              <p className="text-sm md:text-base text-muted-foreground">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 mt- h-auto flex w-full items-center">
        <Button
          asChild
          variant={id === "pro" ? "default" : "secondary"}
          className="w-full hover:scale-100 hover:translate-y-0 shadow-none"
        >
          <Link href={link}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
