"use client";

import Container from "@/components/global/container";
import { useClerk } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";

const Logout = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    try {
      signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error(error);
    }
  }, [signOut]);

  return (
    <Container className="flex justify-center gap-2 py-10">
      <LoaderCircle className="animate-spin" />
      <h1 className="text-xl font-medium">Redirecting to home page...</h1>
      <h2 className="text-xl">See you next time!</h2>
    </Container>
  );
};

export default Logout;
