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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useStore } from "@/store";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  values?: CreateStudent;
  school: School;
}

export default function StudentRegisterConfirm({
  open,
  setOpen,
  values,
  school,
}: Props) {
  const user = useStore((state) => state.user);
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
    subValue?: string | null;
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
        router.push(`/student-register/${school.id}/students/${id}`);
      } else {
        toast.error("登録に失敗しました");
      }
    });
  };

  async function createStudentAction(
    data: CreateStudent
  ): Promise<{ id: string | null }> {
    if (!user?.uid) return { id: null };
    try {
      // const productsRef = collection(db, "schools", school.id, "products");
      // const products = (await getDocs(productsRef)).docs
      //   .map((doc) => ({ ...doc.data() } as Product))
      //   .filter((product) => {
      //     if (product.gender === values?.gender || product.gender === "other") {
      //       return product;
      //     }
      //   });
      const studentRef = doc(db, "schools", school.id, "students", user?.uid);
      await setDoc(studentRef, {
        ...data,
        schoolId: school.id,
        startedAt: new Date(),
        finishedAt: null,
        isDeleted: false,
        schoolName: school.title,
        studentId: user.uid,
      });
      return { id: user.uid };
    } catch (e) {
      console.log(e);
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
                        values?.address?.prefecture &&
                        values.address.prefecture +
                          (values.address.city && values.address.city) +
                          (values.address.street && values.address.street) +
                          "\n" +
                          (values.address.building && values.address.building)
                      }
                    />
                  )}
                  {school.isAddress && (
                    <ValueComponent title="Tel" value={values.tel || ""} />
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
