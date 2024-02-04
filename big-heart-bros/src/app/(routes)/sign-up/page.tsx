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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Input } from "../../../components/ui/input";
import { toast, useToast } from "../../../components/ui/use-toast";
import { Calendar } from "../../../components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
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
    confirm: z.string(),
    gender: z.string().min(2, {
      message: "Please select one",
    }),
    residentType: z.string().min(2, {
      message: "Please select one",
    }),
    interests: z.array(z.string()),
    skills: z.array(z.string()),
    canDrive: z.boolean(),
    ownVehicle: z.boolean(),
    dob: z.date().nullable(),
    commitment: z.enum(["Adhoc", "Low", "Medium", "High"], {
      required_error: "You need to select a commitment level",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export default function SignUp() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      interests: [],
      skills: [],
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

  const fixedInterests = [
    { value: "communityService", label: "Community Service" },
    { value: "environmentalProtection", label: "Environmental Protection" },
    { value: "healthcare", label: "Healthcare Support" },
    { value: "education", label: "Education Support" },
    { value: "youthMentoring", label: "Youth Mentoring" },
    { value: "elderlySupport", label: "Elderly Support" },
    { value: "artsAndCulture", label: "Arts and Culture" },
    { value: "sportsAndRecreation", label: "Sports and Recreation" },
    { value: "technologyAssistance", label: "Technology Assistance" },
    { value: "fundraising", label: "Fundraising Events" },
    { value: "foodBank", label: "Food Bank Assistance" },
    { value: "homelessnessSupport", label: "Homelessness Support" },
  ];

  const fixedSkills = [
    { value: "OnGroundVolunteering", label: "On-Ground Volunteering" },
    { value: "Photography", label: "Photography" },
    { value: "Videography", label: "Videography" },
    { value: "ArtsAndCraft", label: "Arts and Craft" },
    { value: "PerformingSkills", label: "Performing Skills" },
    { value: "Sports", label: "Sports" },
    { value: "Teaching", label: "Teaching" },
    { value: "Leadership", label: "Leadership" },
    { value: "DigitalMarketing", label: "Digital Marketing" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const residentialTypeOptions = [
    { value: "SingaporeCitizen", label: "Singapore Citizen" },
    { value: "SingaporePR", label: "Singapore PR" },
    { value: "DP", label: "Dependent Pass" },
    { value: "EP", label: "EP / PEP / DP with LOC / WP / S Pass etc" },
    { value: "LTVP", label: "Long Term Visitor Pass" },
    { value: "SP", label: "Student Pass" },
    { value: "VV", label: "Visitor Visa" },
  ];

  const yesNoOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const commitmentLevels = ["AdHoc", "Low", "Medium", "High"];

  return (
    <div>
      <div
        className="bg-no-repeat bg-cover h-[2200px]"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="bg-gray-900/40 absolute top-0 left-0 w-full h-[2200px]">
          <Navbar />
          <div className="relative flex flex-col m-28 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="flex-row justify-center grid-cols-3 grid">
              <div className="bg-[#FAA0A0] col-span-1 rounded-2xl w-80 flex items-center justify-center">
                <Image src={logo} alt="logo" width={700} height={700} />
              </div>
              <div className="col-span-2 m-12">
                <p className="mb-3 text-4xl font-bold font-poppins text-[#8B0000]">
                  Create Account
                </p>
                <div className="pt-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="font-semibold font-poppins text-2xl">
                        Account Details
                      </div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                      <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm Password"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Your password must match that of above.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="pt-6 font-semibold font-poppins text-2xl">
                        Personal Information
                      </div>{" "}
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 bg-white border rounded-md shadow-md max-h-60 overflow-auto"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  // selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-wrap">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="mr-12">
                              <FormLabel>Gender</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                  {genderOptions.map((gender) => (
                                    <SelectItem
                                      key={gender.value}
                                      value={gender.value}
                                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    >
                                      {gender.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Choose your gender.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="residentType"
                          render={({ field }) => (
                            <FormItem className="mr-12 mb-6">
                              <FormLabel>Residential Status</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select residential status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                  {residentialTypeOptions.map((status) => (
                                    <SelectItem
                                      key={status.value}
                                      value={status.value}
                                    >
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Choose your residential status.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="canDrive"
                          render={({ field }) => (
                            <FormItem className="mr-12 mb-6">
                              <FormLabel>Can Drive</FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(value === "Yes")
                                }
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                  {yesNoOptions.map((option) => (
                                    <SelectItem
                                      key={option.label}
                                      value={option.label}
                                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select whether you can drive.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ownVehicle"
                          render={({ field }) => (
                            <FormItem className="mr-12 mb-6">
                              <FormLabel>Own Vehicle</FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(value === "Yes")
                                }
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                  {yesNoOptions.map((option) => (
                                    <SelectItem
                                      key={option.label}
                                      value={option.label}
                                      className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select whether you own a vehicle.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="pt-6 font-semibold font-poppins text-2xl">
                        Other Information
                      </div>
                      <div className="pt-2 pb-4">
                        <FormField
                          control={form.control}
                          name="commitment"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>Commitment Level</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-x-4"
                                >
                                  {commitmentLevels.map((level) => (
                                    <FormItem
                                      key={level}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={level} />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {level}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid-cols-2 grid">
                        <div className="w-96">
                          <FormField
                            control={form.control}
                            name="interests"
                            render={({ field }) => (
                              <FormItem className="mr-12 mb-6">
                                <FormLabel>Interests</FormLabel>
                                <div className="space-y-2">
                                  {fixedInterests.map((interest) => (
                                    <label
                                      key={interest.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={field.value.includes(
                                          interest.value
                                        )}
                                        onChange={(e) => {
                                          const updatedValues = e.target.checked
                                            ? [...field.value, interest.value]
                                            : field.value.filter(
                                                (val) => val !== interest.value
                                              );
                                          field.onChange(updatedValues);
                                        }}
                                        className="mr-2"
                                      />
                                      {interest.label}
                                    </label>
                                  ))}
                                </div>
                                <FormDescription>
                                  Choose your main areas of interest.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skills</FormLabel>
                                <div className="space-y-2">
                                  {fixedSkills.map((skill) => (
                                    <label
                                      key={skill.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={field.value.includes(
                                          skill.value
                                        )}
                                        onChange={(e) => {
                                          const updatedValues = e.target.checked
                                            ? [...field.value, skill.value]
                                            : field.value.filter(
                                                (val) => val !== skill.value
                                              );
                                          field.onChange(updatedValues);
                                        }}
                                        className="mr-2"
                                      />
                                      {skill.label}
                                    </label>
                                  ))}
                                </div>
                                <FormDescription>
                                  Choose any relevant skills.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        onClick={() => form.handleSubmit(onSubmit)()}
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
