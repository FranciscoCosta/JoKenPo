import Header from "@/Components/Header";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getSettingsContract } from "@/lib/Web3Service";

const bidSchema = z.object({
  bid: z.number().min(2, "Bid must be at least 2 weis").max(1000, "Bid must be at most 1000 weis"),
  comission: z.number().min(1, "Comission must be at least 0").max(100, "Comission must be at most 100"),
  address: z.string().min(1, "Address must be at least 1 character"),
});

const Admin = () => {
  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      bid: 0,
      comission: 0,
      address: '',
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      const settings = await getSettingsContract();
      form.reset({
        bid: Number(settings.bid),
        comission: Number(settings.comission),
        address: settings.address,
      });
    }
    fetchSettings();
  }, [form]);

  const onSubmit = (data: z.infer<typeof bidSchema>) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex flex-col justify-start items-center h-screen py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Administration Panel
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
            <h3 className="text-2xl font-bold w-full text-center">Update Contract</h3>
            <FormField
              control={form.control}
              name="bid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set the bid value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100 Wei"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    The bid value is the minimum amount of Wei that a player can bid to join the
                    game
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set the comission value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10%"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    The comission value is the percentage of the bid that the house will take
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set the address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="0x"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    The address value is the address of the house
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Admin;
