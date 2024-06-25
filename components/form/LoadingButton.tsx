import { LuLoader2 } from "react-icons/lu";
import { Button, ButtonProps } from "../ui/button";
import { ReactNode } from "react";

interface Props {
  pending: boolean;
  children: ReactNode;
  props?: ButtonProps;
}

export default function LoadingButton({ pending, children, props }: Props) {
  return (
    <Button type="submit" className="w-full" disabled={pending} {...props}>
      {pending && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}