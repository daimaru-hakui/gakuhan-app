'use client';
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
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";

interface Props {
  id: string;
}

export default function SchoolsDropDownMenu({ id }: Props) {

  async function copySchool() {
    const schoolRef = doc(db, "schools", id);
    const productsRef = collection(db, "schools", id, "products");
    const schoolsRef = collection(db, "schools");

    const schoolSnap = await getDoc(schoolRef);
    const school = { ...schoolSnap.data() } as School;

    const productsSnap = await getDocs(productsRef);
    const products = productsSnap.docs.map(
      doc => ({ ...doc.data() } as Product));

    const newSchool = await addDoc(schoolsRef, {
      ...school,
      title: school.title + "copy",
      scheduledDate: serverTimestamp(),
      createdAt: serverTimestamp()
    });

    for (const product of products) {
      const productsRef = collection(db, "schools", newSchool.id, "products");
      addDoc(productsRef, {
        ...product
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>MENU</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copySchool}>Copy</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
}