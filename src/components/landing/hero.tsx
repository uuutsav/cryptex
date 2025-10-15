import React from "react";
import { Spotlight } from "../ui/spotlight";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import Container from "@/components/global/container";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid relative overflow-hidden pt-20">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="gray" />
      <div className=" p-4 max-w-7xl mx-auto relative z-10 w-full pt-10 md:pt-0 flex-col text-center">
        <Container className="max-h-fit">
          <div className="z-10 flex md:mt-12 min-h-36 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border text-base transition-all ease-in hover:cursor-pointer"
              )}
            >
              <AnimatedShinyText className="inline-flex gap-3 items-center justify-center px-4 py-1 transition ease-out hover:duration-800">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex items-center justify-center animate-ping">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex items-center justify-center animate-ping"></div>
                </div>
                <span className="bg-gradient-to-r from-blue-700 via-blue-300 to-blue-700 bg-[length:200%_100%] animate-background-shine bg-clip-text text-transparent text-sm font-semibold">
                  Learn for the Future
                </span>
              </AnimatedShinyText>
            </div>
          </div>
        </Container>
        <Container className="max-h-fit" delay={0.4}>
          <h1 className="text-4xl md:text-7xl md:leading-tight font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
            The Smarter Way <br /> to Learn Crypto Investment.
          </h1>
          <p className="mt-6 max-w-2xl text-center mx-auto leading-relaxed">
            Cryptex offers a practical, hands-on approach to learning
            cryptocurrency investment with real-time market simulations and
            interactive tutorials.
          </p>
        </Container>
        <Container delay={0.6}>
          <InteractiveHoverButton className="mt-10">
            <Link href="/signup">
            Start for Free
            </Link>
          </InteractiveHoverButton>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
