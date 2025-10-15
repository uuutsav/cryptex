"use client";

import { Features } from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";
import WhyCryptex from "@/components/landing/why";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  return (
    <div className="w-full mx-auto relative">
      <GridPattern
        width={75}
        height={75}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,gray,transparent,transparent)] "
        )}
      />
      <Hero />
      <Features />
      <WhyCryptex />
      <Pricing />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
