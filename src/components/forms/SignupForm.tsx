"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signup, getInvite } from "@/lib/actions";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordVerification: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordVerification, {
    message: "Hasła muszą być identyczne",
    path: ["passwordVerification"],
  });

export default function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    getInvite()
      .then((data) => {
        setEmail(data.email);
      })
      .catch((error) => {
        console.error("Error fetching invite:", error);
      });
  }, []);

  const onSignupSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signup(email, values.password);
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Hasło" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="passwordVerification"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Potwierdź hasło"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Zarejestruj</Button>
        </form>
      </Form>
    </div>
  );
}
