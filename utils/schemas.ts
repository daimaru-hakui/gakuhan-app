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
  description: z
    .string()
    .max(1000, { message: "1000文字以内で入力してください" })
    .optional(),
  quantity: z.object({
    min: z.coerce.number().int(),
    max: z.coerce.number().int(),
  }),
  items: z
    .object({
      name: z.string().min(1, { message: "商品名を入力してください" }),
      price: z.coerce.number().min(0, { message: "金額を入力してください" }),
      size: z.string().array(),
      color: z.string().array(),
      unit: z.string(),
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

export const CreateStudentSchema = z.object({
  studentNumber: z
    .string()
    .min(1, { message: "学籍番号を入力してください" })
    .max(20, { message: "20文字以内で入力してください" }),
  gender: z.string().min(1, { message: "性別を選択してください" }),
  lastName: z
    .string()
    .min(1, { message: "苗字を入力してください" })
    .max(20, { message: "20文字以内で入力してください" }),
  firstName: z
    .string()
    .min(1, { message: "名前を入力してください" })
    .max(20, { message: "20文字以内で入力してください" }),
  address: z.object({
    zipCode: z.string().max(8, { message: "文字数を確認してください" }),
    prefecture: z
      .string({ message: "都道府県を選択してください" })
      .max(20, { message: "20文字以内で入力してください" }),
    city: z
      .string()
      .min(1, { message: "市区町村を入力してください" })
      .max(50, { message: "50文字以内で入力してください" }),
    street: z
      .string()
      .min(1, { message: "番地を入力してください" })
      .max(50, { message: "50文字以内で入力してください" }),
    building: z
      .string()
      .max(50, { message: "50文字以内で入力してください" })
      .optional(),
  }),
  tel: z.string().max(11),
});
export type CreateStudent = z.infer<typeof CreateStudentSchema>;

export const CreateMeasureStudentSchema = z.object({
  products: z
    .object({
      name: z.string().min(1, { message: "商品を選択してください" }),
      color: z.string(),
      size: z.string(),
      price: z.number(),
      quantity: z.coerce.number().int(),
      cutLength: z.coerce.number().int(),
      inseam: z.object({
        isFlag: z.boolean(),
        price: z.number(),
        base: z.number(),
      }),
    })
    .array(),
});
export type CreateMeasureStudent = z.infer<typeof CreateMeasureStudentSchema>;
