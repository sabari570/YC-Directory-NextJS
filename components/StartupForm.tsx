"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { createPitch } from "@/lib/actions";
import { RESPONSE_STATUS } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Define Zod Schema for validation
const startupFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  category: z.string().min(1, "Category is required"),
  link: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url),
      "URL must be an image link (jpg, jpeg, png, gif, webp)"
    ),
  pitch: z.string().min(1, "Pitch is required"),
});

export type StartupFormInputs = z.infer<typeof startupFormSchema>;

export default function StartupForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StartupFormInputs>({
    resolver: zodResolver(startupFormSchema), // Integrate Zod schema with React Hook Form
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: StartupFormInputs) => {
    try {
      setIsLoading(true);
      console.log("Form Data Submitted:", data);
      const result = await createPitch(data);
      if (result.status === RESPONSE_STATUS.SUCCESS) {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      toast({
        title: "Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          {...register("title")}
          className="startup-form_input"
          placeholder="Startup Title"
        />
        {errors.title && (
          <p className="startup-form_error">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          className="startup-form_textarea"
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          {...register("category")}
          className="startup-form_input"
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          {...register("link")}
          className="startup-form_input"
          placeholder="Startup Image URL"
        />
        {errors.link && (
          <p className="startup-form_error">{errors.link.message}</p>
        )}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <Controller
          name="pitch"
          control={control}
          render={({ field }) => (
            <MarkdownEditor
              {...field}
              height={300}
              style={{ borderRadius: 20, overflow: "hidden" }}
              placeholder="Briefly describe your idea and what problem it solves"
            />
          )}
        />
        {errors.pitch && (
          <p className="startup-form_error">{errors.pitch.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isLoading}
      >
        {isLoading ? "Submiting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}
