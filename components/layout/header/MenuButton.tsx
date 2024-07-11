import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase/client";
import Link from "next/link";
import paths from "@/utils/paths";
import { AiOutlineSetting } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "@/store";

export default function MenuButton() {
  const setUser = useStore((state) => state.setUser);
  const session = useSession();
  const uid = session.data?.user.uid;
  
  async function handleLogout() {
    await signOut();
    await auth.signOut().then(() => {
      setUser(null);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AiOutlineSetting size={24} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>MENU</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={paths.schoolAll()}>学校一覧</Link>
        </DropdownMenuItem>

        {uid && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={paths.accountShow(uid)}>アカウント</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`${paths.adminAll()}`}>権限管理</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
