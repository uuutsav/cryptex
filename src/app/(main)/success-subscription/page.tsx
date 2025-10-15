"use client";

import { UpdateType } from "@/api/users";
import Container from "@/components/global/container";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuccessSubscription = () => {
  const router = useRouter();

  useEffect(() => {
    const updateAndRedirect = async () => {
      try {
        await UpdateType();
        router.replace("/dashboard");
      } catch (error) {
        console.error("UpdateType failed", error);
      }
    };

    updateAndRedirect();
  }, [router]);

  return (
    <Container className="flex justify-center gap-2 py-10">
      <LoaderCircle className="animate-spin" />
      <h1 className="text-xl font-medium">Redirecting to dashboard...</h1>
      <h2 className="text-xl">Thank you for subscribing!</h2>
    </Container>
  );
};

export default SuccessSubscription;
