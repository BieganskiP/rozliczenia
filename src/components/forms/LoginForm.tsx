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

// import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/slices/createApi";

const formSchema = z.object({
  email: string().email(),
  password: string().min(8),
});

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login({ email: values.email, password: values.password }).unwrap();
      router.push("/pulpit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[400px]">
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
                  <Input placeholder="Email" autoComplete="email" {...field} />
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
    </div>
  );
}
