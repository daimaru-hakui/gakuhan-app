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
    try {
      startTransaction(async () => {
        await createStudentAction(values);
      });
    } catch (e) {
      console.log(e);
    }
  };

  async function createStudentAction(data: CreateStudent) {
    console.log(data);
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
                      value={`〒${values.zipCode}`}
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
                  <Button onClick={handleClick}>採寸を開始</Button>
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
