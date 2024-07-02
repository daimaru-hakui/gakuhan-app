import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
}

export default function MeasureConfirm({ open, setOpen }: Props) {
  return (
    <>
      {open && (
        <Sheet open={open} onOpenChange={setOpen} >
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>明細確認</SheetTitle>
              <SheetDescription>
                採寸項目の確認をお願いします。
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
