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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  favoriteMovie: z.string().min(10),
  moodType: z.enum(["New", "Classic"]),
  moodPreference: z.enum(["Fun", "Serious", "Inspiring", "Scary"]),
  movieActor: z.string().min(3),
});

function Component() {
  const searchParams = useSearchParams();
  const peopleCount = searchParams.get("peopleCount");
  const timeLimit = searchParams.get("timeLimit");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteMovie: "",
      moodType: "New",
      moodPreference: "Fun",
      movieActor: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      peopleCount,
      timeLimit,
      ...values,
    });
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
          className="w-[99px] h-auto"
        />
        <h1 className="text-center text-[50px]">{peopleCount}</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="favoriteMovie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  What&apos;s your favorite movie and why?
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="form-textarea no-scrollbar"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Are you in the mood for a new or classic movie?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="New" />
                      </FormControl>
                      <FormLabel className="form-radio-label">New</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="Classic" />
                      </FormControl>
                      <FormLabel className="form-radio-label">
                        Classic
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moodPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  What are you in the mood for?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="Fun" />
                      </FormControl>
                      <FormLabel className="form-radio-label">Fun</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="Serious" />
                      </FormControl>
                      <FormLabel className="form-radio-label">
                        Serious
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="Inspiring" />
                      </FormControl>
                      <FormLabel className="form-radio-label">
                        Inspiring
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl className="peer sr-only">
                        <RadioGroupItem value="Scary" />
                      </FormControl>
                      <FormLabel className="form-radio-label">Scary</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="movieActor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Which famous film person would you love to be stranded on an
                  island with and why?
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="form-textarea no-scrollbar"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-submit-button">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
