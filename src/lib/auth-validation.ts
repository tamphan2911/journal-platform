import { z } from "zod";

export const professionOptions = ["student", "lecturer", "researcher", "practitioner", "other"] as const;

export const registerSchema = z
  .object({
    email: z.email("Please enter a valid email address.").transform((value) => value.toLowerCase()),
    confirmEmail: z.email("Please confirm with a valid email address.").transform((value) => value.toLowerCase()),
    firstName: z.string().trim().min(1, "Please enter your first name."),
    lastName: z.string().trim().min(1, "Please enter your last name."),
    affiliation: z.string().trim().min(1, "Please enter your university or organization."),
    profession: z.enum(professionOptions, "Please select your profession."),
    studentId: z.string().trim().optional(),
    major: z.string().trim().optional(),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    termsAccepted: z.boolean().refine((value) => value, "You must agree with the terms and conditions."),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmEmail"],
        message: "Email and confirm email must match.",
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password and confirm password must match.",
      });
    }

    if (data.profession === "student") {
      if (!data.studentId) {
        ctx.addIssue({
          code: "custom",
          path: ["studentId"],
          message: "Please enter your student ID.",
        });
      }

      if (!data.major) {
        ctx.addIssue({
          code: "custom",
          path: ["major"],
          message: "Please enter your major.",
        });
      }
    }
  });

export const resetRequestSchema = z.object({
  email: z.email("Please enter a valid email address.").transform((value) => value.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").transform((value) => value.toLowerCase()),
  password: z.string().min(1, "Please enter your password."),
});
