import { auth } from "@/auth";
import StudentsTrashContainer from "@/components/students/trash/StudentsTrashContainer";
import { db } from "@/lib/firebase/server";
import { Product } from "@/utils/product.interface";

interface Props {
  params: {
    id: string;
  };
}

export default async function StudentsTrashPage({ params }: Props) {
  const { id } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const schoolData = JSON.stringify({
    ...schoolSnap.data(),
    id: schoolSnap.id,
  });
  const school = JSON.parse(schoolData);

  const productsSnap = await db
    .collection("schools")
    .doc(id)
    .collection("products")
    .get();
  const products = productsSnap.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Product)
  );

  if (!products) return;
  const other = products.filter((product) => product.gender === "other");

  const man = products.filter(
    (product) => product.gender === "other" || product.gender === "man"
  );
  const woman = products.filter(
    (product) => product.gender === "other" || product.gender === "woman"
  );

  let count = 0;
  if (school.isGender) {
    count = Math.max(man.length, woman.length);
  } else {
    count = other.length;
  }

  return (
    <div className="w-full">
      <StudentsTrashContainer id={id} count={count} school={school} />
    </div>
  );
}
