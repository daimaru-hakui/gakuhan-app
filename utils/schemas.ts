import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "email形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で登録をお願いします。" })
});
export type LoginInputs = z.infer<typeof LoginSchema>;


export const SignUpSchema = z.object({
  email: z.string().email({ message: "email形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で登録をお願いします。" }),
  confirmPassword: z.string().min(8, { message: "8文字以上で登録をお願いします。" })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      path: ['confirmPassword'], code: 'custom', message: 'パスワードと確認パスワードが一致しません',
    });
  }
});
export type SignUpInputs = z.infer<typeof SignUpSchema>;


export const SchoolCreateSchema = z.object({
  title: z.string().min(1, { message: "必須項目です" }),
  scheduledDate: z.date().optional(),
  description: z.string().max(500)
});
export type SchoolCreate = z.infer<typeof SchoolCreateSchema>;


export const CustomerCreateSchema = z.object({
  customerName: z.string(),
  customerCode: z.string(),
  products: z.object({
    productName: z.string(),
    price: z.coerce.number(),
  }).array()
});
export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;