import Container from "@/components/global/container";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const CancelSubscription = () => {
  redirect("/dashboard");
  return (
    <Container className="flex justify-center gap-2 py-10">
      <LoaderCircle className="animate-spin" />
      <h1 className="text-xl font-medium">Redirecting to dashboard...</h1>
    </Container>
  );
};

export default CancelSubscription;
