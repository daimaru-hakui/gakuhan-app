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
  title: z
    .string()
    .min(1, { message: "必須項目です" })
    .max(100, { message: "100文字以内で入力してください" }),
  scheduledDate: z.date().optional(),
  description: z.string().max(1000),
});
export type CreateSchool = z.infer<typeof CreateSchoolSchema>;

export const EditSchoolSchema = z.object({
  title: z
    .string()
    .min(1, { message: "必須項目です" })
    .max(100, { message: "100文字以内で入力してください" }),
  description: z.string().max(1000),
  scheduledDate: z.date().optional(),
});
export type EditSchool = z.infer<typeof EditSchoolSchema>;

export const CreateProductSchema = z.object({
  id: z.string(),
  gender: z.enum(["other", "man", "woman"]),
  isRequire: z.boolean(),
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
      images: z.object({
        productUrl: z.string(),
        sizeUrl: z.string(),
      }),
      inseam: z.object({
        isFlag: z.boolean(),
        min: z.coerce
          .number()
          .int()
          .min(1, { message: "1以上を設定してください" }),
        max: z.coerce.number().int(),
        base: z.coerce.number().int(),
        price: z.coerce.number().int(),
        isUnNeededItem: z.boolean(),
      }),
    })
    .array(),
});
export type CreateProduct = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
  id: z.string(),
  gender: z.enum(["other", "man", "woman"]),
  isRequire: z.boolean(),
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
      images: z.object({
        productUrl: z.string(),
        sizeUrl: z.string(),
      }),
      inseam: z.object({
        isFlag: z.boolean(),
        min: z.coerce
          .number()
          .int()
          .min(1, { message: "1以上を設定してください" }),
        max: z.coerce.number().int(),
        base: z.coerce.number().int(),
        price: z.coerce.number().int(),
        isUnNeededItem: z.boolean(),
      }),
    })
    .array(),
});
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
