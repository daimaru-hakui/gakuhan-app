import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { CreateStudent } from "@/utils/schemas";
import { School } from "@/utils/school.interface";
import { useTransition } from "react";
import { LoadingButton } from "../form/Buttons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  values?: CreateStudent;
  school: School;
}

export default function PublicRegisterConfirm({
  open,
  setOpen,
  values,
  school,
}: Props) {
  const [pending, startTransaction] = useTransition();
  const router = useRouter();

  if (!open || !values) return;

  const ValueComponent = ({
    title,
    value,
    subValue,
  }: {
    title: string;
    value: string;
    subValue?: string;
  }): JSX.Element => {
    return (
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div>{value}</div>
        {subValue && <div className="whitespace-pre">{subValue}</div>}
      </div>
    );
  };

  function getGender(gender: string) {
    switch (gender) {
      case "man":
        return "男性";
      case "woman":
        return "女性";
      default:
        return "";
    }
  }

  const handleClick = () => {
    startTransaction(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { id } = await createStudentAction(values);
      if (id) {
        // router.push(`/schools/${school.id}/public-students/${id}`);
        router.push(`/public-register/${school.id}/public-students/${id}`);
      } else {
        toast.error("登録に失敗しました");
      }
    });
  };

  async function createStudentAction(
    data: CreateStudent
  ): Promise<{ id: string | null }> {
    try {
      // const productsRef = collection(db, "schools", school.id, "products");
      // const products = (await getDocs(productsRef)).docs
      //   .map((doc) => ({ ...doc.data() } as Product))
      //   .filter((product) => {
      //     if (product.gender === values?.gender || product.gender === "other") {
      //       return product;
      //     }
      //   });
      const studentRef = collection(
        db,
        "schools",
        school.id,
        "public-students"
      );
      const { id } = await addDoc(studentRef, {
        ...data,
        schoolId: school.id,
        startedAt: new Date(),
        finishedAt: null,
      });
      return { id };
    } catch (e) {
      return { id: null };
    }
  }

  return (
    <>
      {open && (
        <>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
              <div className="w-full max-w-[600px] mx-auto">
                <DrawerHeader>
                  <DrawerTitle>確認画面</DrawerTitle>
                  <DrawerDescription className="mt-2">
                    以下の内容で登録しても宜しいでしょうか？
                  </DrawerDescription>
                </DrawerHeader>
                <div className="w-full mx-auto space-y-5 p-5">
                  <ValueComponent
                    title="学籍番号"
                    value={values.studentNumber}
                  />
                  <ValueComponent
                    title="氏名"
                    value={`${values.lastName} ${values.firstName}`}
                  />
                  {school.isGender && (
                    <ValueComponent
                      title="性別"
                      value={getGender(values.gender)}
                    />
                  )}
                  {school.isAddress && (
                    <ValueComponent
                      title="住所"
                      value={`〒${values.address.zipCode}`}
                      subValue={
                        values.address.prefecture +
                        values.address.city +
                        values.address.street +
                        "\n" +
                        values.address.building
                      }
                    />
                  )}
                </div>
                <DrawerFooter>
                  <LoadingButton
                    isPending={pending}
                    props={{ onClick: handleClick }}
                    text="採寸を開始"
                  />
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    戻る
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
