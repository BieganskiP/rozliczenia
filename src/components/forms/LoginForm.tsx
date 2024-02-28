"use client";

import { string, z } from "zod";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, signup } from "@/lib/actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: string().email(),
  password: string().min(8),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values.email, values.password);
      router.push("/pulpit");
    } catch (error) {
      console.error(error);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signup(values.email, values.password);
      router.push("/pulpit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Logowanie</TabsTrigger>
        <TabsTrigger value="signup">Rejestracja</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLoginSubmit)}
            className="space-y-4 border-[1px] border-gray-200 p-4 rounded-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            />
            <Button type="submit">Zaloguj</Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="signup">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignupSubmit)}
            className="space-y-4 border-[1px] border-gray-200 p-4 rounded-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            />
            <Button type="submit">Zarejestruj</Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
