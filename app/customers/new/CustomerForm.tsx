'use client';
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomerCreate, CustomerCreateSchema, LoginInputs, LoginSchema, SignUpInputs, SignUpSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function CustomerForm() {
  const form = useForm<CustomerCreate>({
    resolver: zodResolver(CustomerCreateSchema),
    defaultValues: {
      customerName: "",
      customerCode: "",
      products: [{
        productName: "",
        price: 0
      }]
    }
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  const addProduct = () => {
    append({
      productName: "",
      price: 0
    });
  };

  const onSubmit = (data: CustomerCreate) => {
    console.log(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-4">
        <CardTitle>
          <div className="text-2xl">顧客登録</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput control={form.control} type="text" name="customerName" label="顧客名" />
              <FormInput control={form.control} type="text" name="customerCode" label="顧客コード" />
              <div className="flex flex-col gap-3">
                {fields.map((item, idx) => (
                  <div key={item.id} className="flex gap-3">
                    <Input
                      type="text"
                      {...form.register(`products.${idx}.productName`)}
                    />
                    <Input
                      type="number"
                      {...form.register(`products.${idx}.price`)}
                    />
                  </div>
                ))}

              </div>
            </div>
            <Button type="button" size='default' onClick={() => addProduct()}>
              <FiPlus /><div>商品追加</div>
            </Button>
            <SubmitRhkButton isValid={!form.formState.isValid} text="アカウント作成" className="w-full mt-5" />
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}