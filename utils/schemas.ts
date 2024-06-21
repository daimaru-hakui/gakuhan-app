import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "email形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で登録をお願いします。" }),
});
export type LoginInputs = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "email形式で入力してください" }),
    password: z.string().min(8, { message: "8文字以上で登録をお願いします。" }),
    confirmPassword: z
      .string()
      .min(8, { message: "8文字以上で登録をお願いします。" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "パスワードと確認パスワードが一致しません",
      });
    }
  });
export type SignUpInputs = z.infer<typeof SignUpSchema>;

export const CreateSchoolSchema = z.object({
  title: z.string().min(1, { message: "必須項目です" }),
  scheduledDate: z.date().optional(),
  description: z.string().max(500),
});
export type CreateSchool = z.infer<typeof CreateSchoolSchema>;

// export const CreateCustomerSchema = z.object({
//   customerName: z.string(),
//   customerCode: z.string(),
//   products: z
//     .object({
//       productName: z.string(),
//       price: z.coerce.number(),
//     })
//     .array(),
// });
// export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;

export const CreateProductSchema = z.object({
  gender: z.enum(["other", "man", "woman"]),
  description: z.string().optional(),
  quantity: z.object({
    min: z.coerce.number().int(),
    max: z.coerce.number().int(),
  }),
  items: z
    .object({
      name: z.string().min(1, { message: "商品名を入力してください" }),
      size: z.string().array(),
      color: z.string().array(),
      price: z.coerce.number().min(0, { message: "金額を入力してください" }),
      inseam: z.object({
        flag: z.boolean(),
        min: z.coerce
          .number()
          .int()
          .min(1, { message: "1以上を設定してください" }),
        max: z.coerce.number().int(),
        base: z.coerce.number().int(),
      }),
    })
    .array(),
});
export type CreateProduct = z.infer<typeof CreateProductSchema>;
