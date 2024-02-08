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
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import Link from "next/link";
import { ValueSetter } from "date-fns/parse/_lib/Setter";
import { Checkbox } from "../../../components/ui/checkbox";

const interests = [
  { id: "CommunityService", label: "Community Service" },
  { id: "EnvironmentalProtection", label: "Environmental Protection" },
  { id: "HealthcareSupport", label: "Healthcare Support" },
  { id: "EducationSupport", label: "Education Support" },
  { id: "YouthMentoring", label: "Youth Mentoring" },
  { id: "ElderlySupport", label: "Elderly Support" },
  { id: "ArtsAndCulture", label: "Arts and Culture" },
  { id: "SportsAndRecreation", label: "Sports and Recreation" },
  { id: "TechnologyAssistance", label: "Technology Assistance" },
  { id: "FundraisingEvents", label: "Fundraising Events" },
  { id: "FoodBankAssistance", label: "Food Bank Assistance" },
  { id: "HomelessnessSupport", label: "Homelessness Support" },
] as const;

const skills = [
  {
    id: "OnGroundVolunteering",
    label: "On Ground Volunteering",
  },
  {
    id: "Photography",
    label: "Photography",
  },
  {
    id: "Videography",
    label: "Videography",
  },
  {
    id: "ArtsAndCraft",
    label: "Arts and Craft",
  },
  {
    id: "PerformingSkills",
    label: "Performing Skills",
  },
  {
    id: "Sports",
    label: "Sports",
  },
  {
    id: "Teaching",
    label: "Teaching",
  },
  {
    id: "Leadership",
    label: "Leadership",
  },
  {
    id: "DigitalMarketing",
    label: "Digital Marketing",
  },
] as const;

const GenderType = z.enum(["Male", "Female"]);

const ResidentialStatusType = z.enum([
 "SingaporeCitizen", "SingaporePR",
  /*{ value: "DP", label: "Dependent Pass" },
  { value: "EP", label: "EP / PEP / DP with LOC / WP / S Pass etc" },
  { value: "LTVP", label: "Long Term Visitor Pass" },
  { value: "SP", label: "Student Pass" },
  { value: "VV", label: "Visitor Visa" }, -- need to change schema for this*/ 
]);

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string(),
    gender: GenderType,
    residentialStatus: ResidentialStatusType,
    skills: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    interests: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    canDrive: z.boolean(),
    ownVehicle: z.boolean(),
    dob: z.date().nullable(),
    commitmentLevel: z.enum(["Adhoc", "Low", "Medium", "High"], {
      required_error: "You need to select a commitment level",
    }),
    occupation: z.string()
  })
  /*.refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error*/



export default function SignUp() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      interests: [],
      skills: [],
      occupation: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const userData = {...data};

    try {
      const response = await fetch(`/api/createUser/${data.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
        window.location.reload();
      } else {
        console.error("Error making API request:", response.statusText);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
    }


    /*toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    }); -- what does this do?*/

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
          <div className="relative flex flex-col m-28 space-y-8 bg-white shadow-2xl md:flex-row md:space-y-0">
            <div className="flex-row justify-center grid-cols-3 grid">
              <div className="bg-[#FAA0A0] col-span-1 w-80 flex items-center justify-center">
                <Image src={logo} alt="logo" width={700} height={700} />
              </div>
              <div className="col-span-2 my-10  mr-20">
                <p className="mb-3 text-4xl font-bold font-poppins text-[#8B0000]">
                  You're new here!
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
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your phone number.
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
                          name="residentialStatus"
                          render={({ field }) => (
                            <FormItem className="mr-12">
                              <FormLabel>Residential Status</FormLabel>
                              <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SingaporeCitizen" />
                        </FormControl>
                        <FormLabel className="font-normal">
                        SingaporeCitizen
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SingaporePR" />
                        </FormControl>
                        <FormLabel className="font-normal">SingaporePR</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                          )}
                        /> 
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="mr-12">
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
                          name="commitmentLevel"
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
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Interests</FormLabel>
                    <FormDescription>
                      Select your interests.
                    </FormDescription>
                  </div>
                  {interests.map((interests) => (
                    <FormField
                      key={interests.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={interests.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(interests.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, interests.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== interests.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {interests.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />  
                        </div>
                        <div>
                        <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormDescription>
                      Select your skills.
                    </FormDescription>
                  </div>
                  {skills.map((skill) => (
                    <FormField
                      key={skill.id}
                      control={form.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={skill.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, skill.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {skill.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="cursor-pointer border-2 border-white w-full text-center h-12 text-lg flex justify-center items-center transition hover:bg-[#ACE1AF] bg-gray-400/70 font-poppins font-semibold "
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
