import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";

export default function MediaHeader() {
  return (
    <div className="h-[50px] pb-[10px] border-b">
      <Button className="flex gap-1"><LuPlus />アップロード</Button>
    </div>
  );
}