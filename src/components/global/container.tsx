"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  simple?: boolean;
}

const Container = ({
  children,
  delay = 0.2,
  reverse,
  simple,
  className = "",
}: Props) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        delay: delay,
        duration: 0.6,
        type: simple ? "keyframes" : "spring",
        stiffness: simple && 100,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
