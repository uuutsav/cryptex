"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { FADE_IN_VARIANTS } from "@/components/global/animation";
import { OAuthStrategy } from "@clerk/types";
import { useSignUp } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isAppleLoading, setIsAppleLoading] = React.useState(false);
  const [isCoinbaseLoading, setIsCoinbaseLoading] = React.useState(false);

  const { isLoaded, signUp } = useSignUp();
  const { toast } = useToast();

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    if (strategy === "oauth_google") {
      setIsGoogleLoading(true);
    } else if (strategy === "oauth_apple") {
      setIsAppleLoading(true);
    } else if (strategy === "oauth_coinbase") {
      setIsCoinbaseLoading(true);
    }

    try {
      toast({
        title: `Redirecting to ${
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_apple"
            ? "Apple"
            : "Coinbase"
        }`,
        description:
          "Please wait while we redirect you to the authentication page",
      });
      await signUp?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso",
        redirectUrlComplete: "/callback",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full">
      <motion.div
        variants={FADE_IN_VARIANTS}
        animate="visible"
        initial="hidden"
      >
        <div className="flex justify-center">
          <Link href="/">
            <Icons.logo className="h-12 w-auto" />
          </Link>
        </div>
        <h1 className="pt-2 text-2xl">Sign Up for Cryptex</h1>
        <p className="pt-1 text-base text-neutral-500 dark:text-neutral-400">
          Join today and start learning crypto.
        </p>
      </motion.div>
      <motion.div
        className="w-full flex flex-col max-w-xs gap-3 py-6"
        variants={FADE_IN_VARIANTS}
        animate="visible"
        initial="hidden"
      >
        <Button
          size={"lg"}
          variant={"secondary"}
          type="button"
          onClick={() => handleOAuth("oauth_google")}
          disabled={isGoogleLoading || isAppleLoading || isCoinbaseLoading}
        >
          {isGoogleLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Icons.google size={12} className="w-auto" />
          )}
          Continue with Google
        </Button>
        <Button
          size={"lg"}
          variant={"secondary"}
          type="button"
          onClick={() => handleOAuth("oauth_apple")}
          disabled={isGoogleLoading || isAppleLoading || isCoinbaseLoading}
        >
          {isAppleLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Icons.apple size={12} className="w-auto" />
          )}
          Continue with Apple
        </Button>
        <Button
          size={"lg"}
          variant={"secondary"}
          type="button"
          onClick={() => handleOAuth("oauth_coinbase")}
          disabled={isGoogleLoading || isAppleLoading || isCoinbaseLoading}
        >
          {isCoinbaseLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Icons.coinbase size={12} className="w-auto" />
          )}
          Continue with Coinbase
        </Button>
        <p className="pt-4">
          Already have an account?{" "}
          <Link className="font-semibold" href="/login">
            Login
          </Link>
        </p>
      </motion.div>
      <div id="clerk-captcha"></div>
    </div>
  );
};

export default Signup;
