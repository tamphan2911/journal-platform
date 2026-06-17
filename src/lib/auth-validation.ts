import { z } from "zod";

export const professionOptions = ["student", "lecturer", "researcher", "practitioner", "other"] as const;

export const registerSchema = z
  .object({
    email: z.email("Vui lòng nhập email hợp lệ.").transform((value) => value.toLowerCase()),
    confirmEmail: z.email("Vui lòng xác nhận email hợp lệ.").transform((value) => value.toLowerCase()),
    firstName: z.string().trim().min(1, "Vui lòng nhập tên."),
    lastName: z.string().trim().min(1, "Vui lòng nhập họ."),
    organization: z.string().trim().min(1, "Vui lòng nhập trường/đơn vị."),
    affiliation: z.string().trim().min(1, "Vui lòng nhập khoa/bộ phận/chuyên ngành."),
    profession: z.enum(professionOptions, "Vui lòng chọn nghề nghiệp."),
    studentId: z.string().trim().optional(),
    major: z.string().trim().optional(),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu."),
    termsAccepted: z.boolean().refine((value) => value, "Bạn cần đồng ý với điều khoản sử dụng."),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmEmail"],
        message: "Email xác nhận không khớp.",
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp.",
      });
    }

    if (data.profession === "student") {
      if (!data.studentId) {
        ctx.addIssue({
          code: "custom",
          path: ["studentId"],
          message: "Vui lòng nhập mã số sinh viên.",
        });
      }

      if (!data.major) {
        ctx.addIssue({
          code: "custom",
          path: ["major"],
          message: "Vui lòng nhập ngành học.",
        });
      }
    }
  });

export const resetRequestSchema = z.object({
  email: z.email("Vui lòng nhập email hợp lệ.").transform((value) => value.toLowerCase()),
});
