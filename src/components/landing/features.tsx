import {
  BellIcon,
  BellRingIcon,
  CalendarIcon,
  FileTextIcon,
  MessageSquareIcon,
  Share2Icon,
  UserPlusIcon,
  WalletIcon,
} from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
// import AnimatedListDemo from "@/components/example/animated-list-demo";
import { AnimatedBeamMultipleOutputDemo } from "../ui/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { Marquee } from "../ui/marquee";
import Container from "../global/container";
import { AnimatedList } from "../ui/animated-list";
import Notification from "../ui/notification";
import { Calendar } from "../ui/calendar";
import SectionHeader from "../ui/section-header";

const learningModules = [
  {
    name: "Bitcoin Basics",
    body: "Explore the origins, purpose, and key concepts of Bitcoin, the world's first decentralized cryptocurrency.",
  },
  {
    name: "Crypto and Personal Finance",
    body: "Understand how cryptocurrencies fit into personal finance, including budgeting, risk management, and potential returns.",
  },
  {
    name: "Blockchain Technology",
    body: "A deep dive into blockchain as the underlying technology behind most cryptocurrencies, covering how transactions are validated and secured.",
  },
  {
    name: "Security and Encryption",
    body: "Learn the basics of securing crypto investments using wallets, seed phrases, and encryption techniques.",
  },
  {
    name: "Seed Phrases and Recovery",
    body: "Master the importance of seed phrases in crypto recovery, and learn how to safeguard your keys effectively.",
  },
];

let notifications = [
  {
    name: "Portfolio Update",
    description: "Your portfolio value increased by 5% today.",
    time: "15m ago",
    icon: <WalletIcon size={20} />,
    color: "#00C9A7",
  },
  {
    name: "New User Achievement",
    description: "Congratulations! You unlocked the 'Crypto Explorer' badge.",
    time: "10m ago",
    icon: <UserPlusIcon size={20} />,
    color: "#FFB800",
  },
  {
    name: "Market News",
    description: "Bitcoin is up 2% after a major announcement.",
    time: "5m ago",
    icon: <MessageSquareIcon size={20} />,
    color: "#FF3D71",
  },
  {
    name: "Learning Reminder",
    description: "Don't miss today's lesson on smart contract basics.",
    time: "2m ago",
    icon: <BellRingIcon size={20} />,
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const features = [
  {
    Icon: FileTextIcon,
    name: "Master Crypto Concepts",
    description: "Track your progress through key concepts.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {learningModules.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedList className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ cryptos and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Explore historical crypto price trends.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export function Features() {
  return (
    <div
      id="features"
      className="p-4 max-w-7xl mx-auto flex-col items-center justify-center pt-20 md:pt-32"
    >
      <SectionHeader
        badge="Features"
        title1="Hands-on Learning,"
        title2="Risk-Free"
        description="Practice building a diverse crypto portfolio. Track its performance,
          analyze trends, and refine your strategies like a pro."
      />
      <Container>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </Container>
    </div>
  );
}
