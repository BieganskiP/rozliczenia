"use effect";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateRegistryMutation,
  useCurrentUserQuery,
} from "@/redux/slices/createApi";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  amount: z.number(),
  date: z.string(),
});

interface AddRegistryProps {
  refetch: any;
}

export default function AddRegistry({ refetch }: AddRegistryProps) {
  const [createRegistry, { isLoading }] = useCreateRegistryMutation();
  const { data: currentUser } = useCurrentUserQuery();

  const form = useForm({
    defaultValues: {
      amount: 0,
      date: "",
      wage: 0,
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const parsedAmount = Number(formData.amount);

    const data = {
      ...formData,
      amount: parsedAmount,
      wage: currentUser?.wage,
    };

    try {
      await createRegistry(data).unwrap();
      form.reset();
      refetch();
    } catch (err) {
      console.error("Failed to create registry:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 border-[1px] border-gray-200 p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Amount" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Date" type="date" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Wczytywanie..." : "Dodaj wpis"}
        </Button>
      </form>
    </Form>
  );
}
