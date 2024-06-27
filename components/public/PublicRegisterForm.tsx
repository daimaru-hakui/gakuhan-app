import React, { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import FormAddressSelect from "../form/FormAddressSelect";
import { Button } from "../ui/button";
import GenderSelect from "./GenderSelect";
import { CreateStudent, CreateStudentSchema } from "@/utils/schemas";
import { School } from "@/utils/school.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  school: School;
}

export default function PublicRegisterForm({ school }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateStudent>({
    resolver: zodResolver(CreateStudentSchema),
    defaultValues: {
      studentNumber: "",
      lastName: "",
      firstName: "",
      gender: school.isGender ? "" : "other",
      zipCode: "",
      address: {
        prefecture: "大阪府",
        city: "",
        street: "",
        building: ""
      }
    },
  });

  function onSubmit(data: CreateStudent) {
    console.log(data);
  }

  function Error(data: any) {
    console.log(data);
  }

  async function handleClickGetAddress(zipCode: string) {
    setLoading(true);
    try {
      const newZipCode = zipCode
        .replace(/[０-９]/g, function (s: any) {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
        })
        .replace(/[- ー]/g, "");
      const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${newZipCode}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;
      console.log(data);
      form.setValue("address.prefecture", data.results[0].address1);
      form.setValue("address.city", data.results[0].address2);
      form.setValue("address.street", data.results[0].address3);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, Error)} className="space-y-6">
        <FormInput form={form} name="studentNumber" label="学籍番号" require />
        <div>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <FormInput label="姓" form={form} name="lastName" placeholder="姓" require />
            <FormInput label="名" form={form} name="firstName" placeholder="名" require />
          </div>
        </div>
        <GenderSelect form={form} />
        <div>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="flex gap-1">
              <FormInput
                form={form}
                name="zipCode"
                label="〒番号"
                placeholder=""
              />
              <Button
                disabled={loading}
                type="button"
                className="min-w-12 mt-8"
                onClick={() => handleClickGetAddress(form.watch("zipCode"))}
              >
                {loading ? <ReloadIcon className="h-4 animate-spin" /> : "検索"}
              </Button>
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
          label="番地"
          placeholder=""
        />
        <FormInput
          form={form}
          name="address.building"
          label="建物"
          placeholder=""
        />
        <Button>採寸開始</Button>
      </form>
    </Form>
  );
}
