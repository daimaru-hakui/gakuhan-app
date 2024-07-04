"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/firebase/client";
import { Product } from "@/utils/product.interface";
import { School } from "@/utils/school.interface";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useTransition } from "react";
import { toast } from "sonner";
import LoaderIcon from "../LoaderIcon";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";

interface Props {
  id: string;
}

export default function SchoolsDropDownMenu({ id }: Props) {
  const [pending, startTransition] = useTransition();

  async function handleClickCopySchool() {
    const schoolRef = doc(db, "schools", id);
    const productsRef = collection(db, "schools", id, "products");
    const schoolsRef = collection(db, "schools");

    const schoolSnap = await getDoc(schoolRef);
    const school = { ...schoolSnap.data() } as School;

    const productsSnap = await getDocs(productsRef);
    const products = productsSnap.docs.map(
      (doc) => ({ ...doc.data() } as Product)
    );

    const newSchool = await addDoc(schoolsRef, {
      ...school,
      title: school.title + "copy",
      scheduledDate: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    for (const product of products) {
      const productsRef = collection(db, "schools", newSchool.id, "products");
      addDoc(productsRef, {
        ...product,
      });
    }
  }

  function handleClickDeleteSchool(id: string) {
    const result = confirm("削除しても宜しいでしょうか");
    if (!result) return;
    try {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await logicDeleteSchool(id);
        // await deleteSchool(id);
        toast.success("削除しました");
      });
    } catch (e) {
      console.log(e);
      toast.error("削除に失敗しました");
    }
  }

  // async function deleteSchool(id: string) {
  //   const schoolRef = doc(db, "schools", id);
  //   await deleteDoc(schoolRef);
  // }

  async function logicDeleteSchool(id: string) {
    const schoolRef = doc(db, "schools", id);
    await updateDoc(schoolRef, {
      isDeleted: true,
      detetedAt: new Date(),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiDotsVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>MENU</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/schools/${id}/`}>設定</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/schools/${id}/students`}>生徒一覧</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/schools/${id}/students/board`}>採寸掲示板</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClickCopySchool}
          className="cursor-pointer"
        >
          複製
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleClickDeleteSchool(id)}
          className="cursor-pointer"
        >
          {pending ? <LoaderIcon className="m-0 h-4 w-4" /> : "削除"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
