import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl="/callback"
      signUpForceRedirectUrl="/callback"
    />
  );
}
