"use client";
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
import { getAddress } from "@/utils/fetch";
import StudentRegisterConfirm from "./StudentRegisterConfirm";
import PrivacyText from "./PrivacyText";

interface Props {
  school: School;
  email?: string;
}

export default function StudentRegisterForm({ school, email }: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<CreateStudent>();
  const [agreement, setAgreement] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateStudent>({
    resolver: zodResolver(CreateStudentSchema),
    mode: "onChange",
    defaultValues: {
      studentNumber: "",
      lastName: "",
      firstName: "",
      gender: school.isGender ? "" : "other",
      address: {
        zipCode: school.isAddress ? "" : null,
        prefecture: school.isAddress ? "" : null,
        city: school.isAddress ? "" : null,
        street: school.isAddress ? "" : null,
        building: school.isAddress ? "" : null,
      },
      tel: school.isAddress ? "" : null,
      email: email || "",
    },
  });

  function onSubmit(data: CreateStudent) {
    setOpen(true);
    setValues(data);
  }

  function Error(data: any) {
    console.log(data);
  }

  async function handleClickGetAddress(zipCode: string | null) {
    if (!zipCode) return;
    setLoading(true);
    try {
      const data = await getAddress(zipCode);
      if (!data) return;
      form.setValue("address.prefecture", data.results?.at(0)?.address1 || "", {
        shouldValidate: true,
      });
      form.setValue("address.city", data.results?.at(0)?.address2 || "", {
        shouldValidate: true,
      });
      form.setValue("address.street", data.results?.at(0)?.address3 || "", {
        shouldValidate: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, Error)} className="space-y-6">
        <FormInput form={form} name="studentNumber" label="学籍番号" require />
        <div>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <FormInput
              label="姓"
              form={form}
              name="lastName"
              placeholder="姓"
              require
            />
            <FormInput
              label="名"
              form={form}
              name="firstName"
              placeholder="名"
              require
            />
          </div>
        </div>
        {school.isGender && <GenderSelect form={form} require />}
        {school.isAddress && (
          <>
            <div>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="flex gap-1">
                  <FormInput
                    type="tel"
                    form={form}
                    name="address.zipCode"
                    label="〒番号"
                    require
                  />
                  <Button
                    disabled={loading}
                    type="button"
                    className="w-12 min-w-12 mt-8"
                    onClick={() =>
                      handleClickGetAddress(form.watch("address.zipCode"))
                    }
                  >
                    {loading ? (
                      <ReloadIcon className="h-4 animate-spin" />
                    ) : (
                      "検索"
                    )}
                  </Button>
                </div>
                <FormAddressSelect
                  form={form}
                  name="address.prefecture"
                  label="都道府県"
                  require
                />
              </div>
            </div>
            <FormInput
              form={form}
              name="address.city"
              label="市区町村"
              require
            />
            <FormInput
              form={form}
              name="address.street"
              label="町名・番地"
              require
            />
            <FormInput form={form} name="address.building" label="建物" />
            <FormInput type="tel" form={form} name="tel" label="Tel" require />
          </>
        )}
        <FormInput
          type="email"
          form={form}
          name="email"
          label="Email"
          placeholder="確認メールが必要な場合は入力してください"
        />
        <PrivacyText agreement={agreement} setAgreement={setAgreement} />
        <div className="text-center">
          <Button disabled={!form.formState.isValid || !agreement}>
            確認する
          </Button>
        </div>
        <StudentRegisterConfirm
          open={open}
          setOpen={setOpen}
          values={values}
          school={school}
        />
      </form>
    </Form>
  );
}
