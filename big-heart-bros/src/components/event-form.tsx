"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Checkbox } from "./ui/checkbox";

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
  ] as const

const EventType = z.enum(["Volunteering", "Training", "Workshop"]);

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  description: z.string().min(1, {
    message: "Description cannot be empty",
  }),
  capacity: z.number(),
  type: EventType,
  registrationDeadline: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function EventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "Volunteering",
      registrationDeadline: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      skills: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Volunteering at Old Folks Home"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Fill in a name for your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Require performers for Old Folks"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Fill in your event requirements.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Capacity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the maximum capacity for the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select event type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Volunteering" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Volunteering
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Training" />
                      </FormControl>
                      <FormLabel className="font-normal">Training</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Workshop" />
                      </FormControl>
                      <FormLabel className="font-normal">Workshop</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Registration Deadline</FormLabel>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="py-2 px-4 bg-white">
                      {" "}
                      {/* Set a background color */}
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() 
                        }
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Start Date</FormLabel>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="py-2 px-4 bg-white">
                      {" "}
                      {/* Set a background color */}
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() 
                        }
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event End Date</FormLabel>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="py-2 px-4 bg-white">
                      {" "}
                      {/* Set a background color */}
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() 
                        }
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Skills</FormLabel>
                <FormDescription>
                  Select the items skills relevant to your event.
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
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {skill.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
