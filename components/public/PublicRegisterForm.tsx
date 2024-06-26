import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import FormAddressSelect from "../form/FormAddressSelect";
import { Button } from "../ui/button";
import GenderSelect from "./GenderSelect";
import { CreateStudent } from "@/utils/schemas";
import { School } from "@/utils/school.interface";

interface Props {
  school: School;
}

export default function PublicRegisterForm({ school }: Props) {
  const form = useForm<CreateStudent>({
    defaultValues: {
      gender: school.isGender ? "" : "other",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormInput form={form} name="studentNumber" label="学籍番号" />
        <div>
          <h3>名前</h3>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <FormInput form={form} name="lastName" placeholder="姓" />
            <FormInput form={form} name="firstName" placeholder="名" />
          </div>
        </div>
        <GenderSelect form={form} />
        <div>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="flex items-end gap-1">
              <FormInput
                form={form}
                name="zipCode"
                label="〒番号"
                placeholder="ハイフン無しで入力"
              />
              <Button>検索</Button>
            </div>
            <FormAddressSelect
              form={form}
              name="address.prefecture"
              label="都道府県"
            />
          </div>
        </div>
        <FormInput
          form={form}
          name="address.city"
          label="市区町村"
          placeholder=""
        />
        <FormInput
          form={form}
          name="address.street"
          label="市区町村"
          placeholder=""
        />
        <FormInput
          form={form}
          name="address.building"
          label="市区町村"
          placeholder=""
        />
      </form>
    </Form>
  );
}
