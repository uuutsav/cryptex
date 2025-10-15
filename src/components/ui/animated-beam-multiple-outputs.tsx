"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.cryptex />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.bitcoin />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.solana />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.ethereum />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.cardano />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.binance />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  cryptex: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 500 500"
    >
      <path
        fillRule="evenodd"
        fill="#3B82F6"
        d="M147.038 50.738c-2.687 1.367-4.449 3.667-7.863 10.262-14.871 28.722-30.085 44.323-58.874 60.371C68.872 127.741 66 130.632 66 135.767c0 4.829 4.333 8.68 17.19 15.274 16.729 8.58 26.574 15.47 36.914 25.833 7.907 7.925 10.338 11.128 13.756 18.126 7.805 15.98 8.485 20.307 8.556 54.5.045 21.356-.315 31.658-1.248 35.754-4.361 19.139-17.24 37.364-36.432 51.552-3.72 2.75-12.613 8.018-19.762 11.707C68.998 356.757 66 359.325 66 364.766c0 5.645 2.535 8.273 13.754 14.264 27.003 14.418 42.895 30.002 57.201 56.094 7.791 14.208 9.276 15.876 14.143 15.876 5.54 0 9.096-3.613 14.58-14.811 10.43-21.3 26.018-39.831 42.559-50.593 16.069-10.455 27.065-13.267 47.96-12.262 25.153 1.209 45.268 12.204 62.909 34.386 5.61 7.054 14.002 20.557 19.263 30.993 1.445 2.867 4.025 6.805 5.733 8.75 2.53 2.882 3.808 3.537 6.898 3.537 4.611 0 8.367-3.803 13.129-13.293 4.774-9.515 12.831-21.451 20.129-29.819 9.714-11.138 19-17.893 43.835-31.888 6.203-3.496 8.907-7.106 8.907-11.891 0-3.409-5.025-8.099-12.941-12.079-25.14-12.64-43.052-30.087-57.523-56.03-7.019-12.583-9.398-15.756-12.663-16.895-5.915-2.062-10.387 1.988-17.809 16.129-16.261 30.982-37.124 50.93-62.064 59.343-8.674 2.926-35.702 2.729-46.291-.338-24.658-7.139-46.706-25.322-58.238-48.028-7.63-15.024-7.742-15.668-8.23-47.385-.651-42.251 1.037-53.457 10.443-69.326 11.621-19.607 38.633-39.703 59.239-44.071 8.575-1.818 32.548-1.825 41.077-.013 13.644 2.899 25.952 10.262 38.5 23.031 9.593 9.763 15.955 18.831 24.944 35.553 7.788 14.489 10.074 17 15.477 17 5.607 0 8.105-2.588 14.684-15.214 13.259-25.446 29.19-41.132 57.62-56.735 11.356-6.233 12.767-7.571 13.464-12.772.727-5.414-2.529-8.955-13.446-14.624-4.808-2.498-11.068-6.029-13.91-7.848-14.728-9.427-30.747-26.422-39.907-42.339-11.343-19.71-14.987-23.694-20.163-22.051-3.417 1.084-8.005 6.934-13.79 17.583-8.027 14.778-13.216 22.533-19.92 29.771-12.967 14.002-28.441 23.937-44.268 28.422-6.214 1.761-10.307 2.196-20.285 2.157-24.459-.096-40.628-7-58.476-24.969-9.702-9.768-15.799-18.358-25.467-35.881-3.945-7.15-7.934-13.744-8.865-14.652-2.707-2.644-7.252-3.096-11.154-1.11m99.073 135.151c-1.039 1.039-3.596 4.976-5.682 8.75-12.064 21.825-22.629 32.433-45.043 45.229-8.325 4.752-10.464 8.115-8.374 13.16.939 2.269 3.885 4.589 11.744 9.25 16.819 9.977 31.364 24.659 41.186 41.578 5.618 9.677 7.184 11.144 11.903 11.144 4.67 0 5.665-1.017 11.244-11.5 7.771-14.6 21.672-29.658 34.288-37.141 18.428-10.931 21.227-13.495 19.582-17.941-.973-2.629-6.008-6.894-11.343-9.607-10.977-5.581-24.732-17.069-32.406-27.064-2.215-2.886-6.357-9.072-9.204-13.747s-6.347-9.738-7.778-11.25c-3.082-3.257-7.357-3.621-10.117-.861"
      />
    </svg>
  ),
  bitcoin: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z"
        fill="#f7931a"
      />
      <path
        d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z"
        fill="#ffffff"
      />
    </svg>
  ),
  ethereum: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100"
      height="100"
      fill="#627eea" // Ethereum Blue
    >
      <path d="M16.498 0L16.28 1.38v18.213l.218.218 8.182-4.89z" />
      <path d="M16.498 0L8.318 14.92l8.18 4.89V0z" />
      <path d="M16.498 21.408l-.123.15v8.613l.123.355 8.187-11.47z" />
      <path d="M16.498 30.526v-9.118l-8.18-5.855z" />
      <path d="M16.498 19.81l8.183-4.89-8.183-3.67-8.18 3.67z" />
    </svg>
  ),
  solana: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="100"
      height="100"
      fill="#00ffa3" // Solana Greenish
    >
      <path d="M27.75 19.35c-.3-.35-.8-.6-1.3-.6H5.9c-.2 0-.5.1-.7.3L1.7 23.4c-.4.4-.1 1 .5 1h20.55c.2 0 .5-.1.7-.3l3.5-3.4c.45-.4.3-1-.2-1.35zM3.05 13.6c.3-.3.8-.6 1.3-.6h20.5c.2 0 .5.1.7.3l3.5 3.3c.4.4.1 1-.5 1H6.2c-.2 0-.5-.1-.7-.3l-3.5-3.3c-.45-.45-.35-1 .1-1.4zM27.75 4.6c-.3-.35-.8-.6-1.3-.6H5.9c-.2 0-.5.1-.7.3L1.7 8.65c-.4.4-.1 1 .5 1h20.55c.2 0 .5-.1.7-.3l3.5-3.35c.45-.4.3-1-.2-1.35z" />
    </svg>
  ),
  cardano: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100"
      height="100"
      fill="#0033ad" // Cardano Blue
    >
      <circle cx="4.8" cy="16" r="2" />
      <circle cx="10" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="22" cy="16" r="2" />
      <circle cx="27.2" cy="16" r="2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="16" cy="26" r="2" />
    </svg>
  ),
  binance: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100"
      height="100"
      fill="#f0b90b" // Binance Yellow
    >
      <path d="M16 0l-6 6 2 2 4-4 4 4 2-2zM6 16l-4-4 2-2 2 2v4zm20 0l4-4-2-2-2 2v4zm-6 10l-4 4-4-4-2 2 6 6 6-6zM16 12l-4 4 4 4 4-4z" />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default Icons;
