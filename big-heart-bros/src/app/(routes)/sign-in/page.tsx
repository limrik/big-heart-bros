"use client";

import { cn } from "../../../lib/utils";
import Navbar from "../../../components/navbar";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import backgroundImage from "../../assets/volunteerStock1.jpg";
import logo from "../../assets/bigatheartslogo.png";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import { Input } from "../../../components/ui/input";
import { toast, useToast } from "../../../components/ui/use-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: "Password must contain at least one special character.",
    }),
});

export default function SignIn() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover h-[1000px]"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="bg-gray-900/40 absolute top-0 left-0 w-full h-[1000px]">
          <Navbar />
          <div className="relative flex flex-col m-28 space-y-8 bg-white shadow-2xl md:flex-row md:space-y-0">
            <div className="flex-row justify-center grid-cols-3 grid">
              <div className="bg-[#FAA0A0] col-span-1 w-80 flex items-center justify-center">
                <Image src={logo} alt="logo" width={700} height={700} />
              </div>
              <div className="col-span-2 m-12 px-12">
                <p className="mb-3 text-4xl font-bold font-poppins text-[#8B0000]">
                  Welcome to BigHeartBros!
                </p>
                <div className="pt-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="font-semibold font-poppins text-2xl">
                        Log in
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your email address.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Password"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Please input a secure password.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="cursor-pointer border-2 border-white w-full text-center h-12 text-lg flex justify-center items-center transition hover:bg-[#ACE1AF] bg-gray-400/70 font-poppins font-semibold "
                        onClick={() => form.handleSubmit(onSubmit)()}
                      >
                        Log in
                      </Button>
                    </form>
                  </Form>
                  <div className="flex items-center font-poppins text-sm my-6 justify-center">
                    <p className="mr-2 text-gray-500">Don't have an account?</p>
                    <Link href={"/sign-up"} className="underline">
                      Sign up here.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
