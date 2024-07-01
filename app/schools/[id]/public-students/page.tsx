import PublicStudentsContainer from "@/components/public-students/PublicStudentsContainer";
import { db } from "@/firebase/server";
import { Product } from "@/utils/product.interface";
import { School } from "@/utils/school.interface";

interface Props {
  params: {
    id: string;
  };
}

export default async function PublicStudentsPage({ params }: Props) {
  const { id } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

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

  const jsonSchool = JSON.stringify({ ...school });
  const parseSchool = JSON.parse(jsonSchool);

  return (
    <div className="w-full">
      <PublicStudentsContainer id={id} count={count} school={parseSchool} />
    </div>
  );
}
