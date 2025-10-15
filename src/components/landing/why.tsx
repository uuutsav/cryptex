import React from "react";
import Container from "../global/container";
import {
  Zap,
  BarChart3,
  LifeBuoy,
  Paintbrush,
  ShieldCheck,
  Link2,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeader from "../ui/section-header";

type PerkProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

const perks = [
  {
    icon: Zap,
    title: "Fast Transactions",
    description:
      "Learn how to execute crypto transactions efficiently with real-time simulations.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description:
      "Gain in-depth insights into market trends and portfolio performance to make informed decisions.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Learning Support",
    description:
      "Access guidance and resources anytime to help you succeed in your crypto investment journey.",
  },
  {
    icon: Paintbrush,
    title: "Customizable Learning Paths",
    description:
      "Tailor your learning experience to focus on areas like trading, NFTs, DeFi, or blockchain technology.",
  },
  {
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Understand key security practices for keeping your crypto investments safe.",
  },
  {
    icon: Link2,
    title: "Seamless Integration",
    description:
      "Easily connect with your favorite crypto platforms and tools to enhance your learning experience.",
  },
];

const WhyCryptex = () => {
  return (
    <div
      id="whyCryptex"
      className="p-4 max-w-7xl mx-auto flex-col items-center justify-center pt-20 md:pt-32"
    >
      <SectionHeader
        badge="Why Cryptex?"
        title1="Master Crypto Investing,"
        title2="The Smart Way"
        description="Build and manage a simulated crypto portfolio without the risk of
            real-world losses. Analyze live market trends and fine-tune your
            strategies as you learn by doing."
      />
      <Container>
        <div className="w-full mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perks, index) => (
              <Perk key={index} index={index} {...perks} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Perk = ({ icon: Icon, title, description, index }: PerkProps) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r transform-gpu py-10 relative group/feature",
        (index === 0 || index === 3) && "lg:border-l",
        index < 3 && "lg:border-b"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-r from-blue-700/25 to-transparent pointer-events-none" />
      <div className="group-hover/feature:-translate-y-1 transform-gpu transition-all duration-300 flex flex-col w-full">
        <div className="mb-4 relative z-10 px-10">
          <Icon
            strokeWidth={1.3}
            className="w-10 h-10 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover/feature:scale-75 group-hover/feature:text-foreground"
          />
        </div>
        <div className="text-lg font-medium font-heading mb-2 relative z-10 px-10">
          <div className="absolute left-0 -inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-secondary group-hover/feature:bg-blue-600 transition-all duration-500 origin-center" />
          <span className="group-hover/feature:-translate-y- group-hover/feature:text- transition duration-500 inline-block heading">
            {title}
          </span>
        </div>
        <p className="text-sm max-w-md relative z-10 px-10">{description}</p>
      </div>
    </div>
  );
};

export default WhyCryptex;
