import React from "react";
import Container from "../global/container";
import SectionBadge from "./section-badge";

const SectionHeader = ({
  badge,
  title1,
  title2,
  description,
}: {
  badge: string;
  title1: string;
  title2: string;
  description: string;
}) => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
        <SectionBadge title={badge} />
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
          {title1} <br /> {title2}
        </h2>
        <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
          {description}
        </p>
      </div>
    </Container>
  );
};

export default SectionHeader;
