import React from "react";
import SectionHeader from "../ui/section-header";
import Container from "../global/container";
import { Marquee } from "../ui/marquee";
import Image from "next/image";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Ravi Kapoor",
    username: "@ravi_investor",
    body: "Cryptex made learning crypto so much easier! The hands-on practice and portfolio tracking really boosted my confidence.",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sophia Lee",
    username: "@sophia_trader",
    body: "I loved how I could experiment with different crypto strategies without any real risk. It's perfect for beginners and pros alike.",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Carlos Martinez",
    username: "@carlos_crypto",
    body: "The way Cryptex simulates real market conditions is unmatched. It's the best way to practice before diving into real investments.",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Ayesha Khan",
    username: "@ayesha_trades",
    body: "I used Cryptex to understand diversification, and it completely changed how I approach investments. Highly recommend it!",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Liam Brown",
    username: "@liam_trends",
    body: "Analyzing trends through Cryptex gave me the insights I needed to improve my portfolio. It's a game-changer for learning.",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Chen",
    username: "@emily_crypto",
    body: "I refined my strategies and learned from my mistakes in a safe environment. Cryptex is a must-have for crypto enthusiasts.",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="p-4 max-w-7xl mx-auto flex-col items-center justify-center pt-20 md:pt-32"
    >
      <SectionHeader
        badge="Testimonials"
        title1="Real Stories,"
        title2="Real Growth"
        description="Hear from users who've transformed their crypto knowledge
            through immersive, risk-free practice. Learn how they refined their
            strategies and grew confident in building successful portfolios."
      />
      <Container>
        <div className="relative flex flex-col items-center justify-center overflow-hidden md:mx-10">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#121212]"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#121212]"></div>
        </div>
      </Container>
    </div>
  );
};

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          src={img}
          width={32}
          height={32}
          alt={name}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default Testimonials;
