"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useGetInviteQuery, useSignupMutation } from "@/redux/slices/createApi";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export default function SignupForm() {
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastSegment = (pathParts.pop() || pathParts.pop()) ?? null;
    setInvitationId(lastSegment);
  }, []);

  const { data: inviteData, isLoading: inviteLoading } = useGetInviteQuery(
    invitationId ?? "",
    {
      skip: !invitationId,
    }
  );
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  useEffect(() => {
    if (inviteData?.email) {
      form.reset({ email: inviteData.email });
    }
  }, [inviteData, form]);

  const onSignupSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signup({
        email: inviteData?.email,
        password: values.password,
      }).unwrap();
      router.push("/pulpit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[400px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSignupSubmit)}
          className="space-y-4 border-[1px] border-gray-200 p-4 rounded-md"
        >
          {inviteData?.email && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      disabled
                      value={inviteData.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSigningUp || inviteLoading}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
