"use client";

import React, { useContext, useEffect } from "react";
import Container from "@/components/global/container";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/contexts/UserContext";
import { UpdateUser } from "@/api/users";
import Upgrade from "@/components/main/upgrade";

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: "Plase enter your name",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  email: z
    .string({
      required_error: "Please enter an email",
    })
    .email({
      message: "Invalid email address",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, isLoaded } = useContext(UserContext);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [form, user]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;

    const changedValues = Object.entries(data).reduce((acc, [key, value]) => {
      const originalValue = user[key as "name" | "email"];
      if (value !== originalValue) {
        acc[key as keyof ProfileFormValues] = value;
      }
      return acc;
    }, {} as Partial<ProfileFormValues>);

    if (Object.keys(changedValues).length === 0) {
      toast({
        title: "No changes detected",
        description: "You haven't modified any values.",
      });
    } else {
      await UpdateUser(changedValues);
      toast({
        title: "Changed values:",
        description: JSON.stringify(changedValues, null, 2),
      });
    }
  }

  return (
    <Container className="pt-2 h-full flex flex-col gap-4 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="font-medium md:text-xl">Profile</h1>
        {isLoaded && user?.type == "FREE" && <Upgrade />}
      </div>
      <p className="text-muted-foreground">
        This is what others will see about you on the site.
      </p>
      {isLoaded && (
        <Container>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 lg:w-[800px] px-2"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It will be shown on your
                      public profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johntrades@bitcoin.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your email address. It will be used to send you
                      notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                Update profile
              </Button>
            </form>
          </Form>
        </Container>
      )}
    </Container>
  );
};

export default Profile;
