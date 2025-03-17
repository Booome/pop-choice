"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  peopleCount: z.number().min(1).max(50),
  timeLimit: z
    .string()
    .regex(/^([0-9]{2}:[0-9]{2})$/, "Time must be in HH:MM format")
    .refine((time) => {
      const minutes = time.split(":").map(Number)[1];
      return minutes >= 0 && minutes <= 59;
    }, "Invalid time format. Minutes must be 00-59"),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      peopleCount: 1,
      timeLimit: "00:30",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { peopleCount, timeLimit } = values;

    const params = new URLSearchParams();
    params.set("peopleCount", peopleCount.toString());
    params.set("timeLimit", timeLimit);

    router.push(`/question?${params.toString()}`);
  }

  return (
    <div className="page-container">
      <div>
        <Image
          src="/logo.png"
          alt="PopChoice"
          priority
          width={99}
          height={0}
          className="w-[99px] h-auto mx-auto"
        />
        <h1 className="mx-auto font-[family-name:var(--font-carter-one)] text-[45px] font-bold">
          PopChoice
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="peopleCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">How many people?</FormLabel>
                <FormControl>
                  <Input className="form-input" placeholder="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  How much time do you have?
                </FormLabel>
                <FormControl>
                  <Input
                    className="form-input"
                    type="text"
                    pattern="[0-9]{2}:[0-9]{2}"
                    placeholder="00:00"
                    title="Please enter duration in MM:SS format"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="form-submit-button">Start</Button>
        </form>
      </Form>
    </div>
  );
}
