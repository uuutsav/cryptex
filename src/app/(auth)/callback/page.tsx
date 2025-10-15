import { CreateUser, GetUserById } from "@/api/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthCallback = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/login");
  }

  const existingUser = await GetUserById();

  if (!existingUser) {
    CreateUser();
  }

  redirect("/dashboard");
};

export default AuthCallback;
