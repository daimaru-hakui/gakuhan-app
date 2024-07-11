import { auth } from "@/auth";
import ProductContainer from "@/components/products/ProductContainer";
import SchoolContainer from "@/components/schools/setting/SchoolContainer";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function SchoolPage({ params }: Props) {
  const id = params.id;
  const session = await auth();
  if (!session)  {
    redirect(`/auth/login`)
  }

  const role = session.user.role;
  if (role === "user") notFound();
  
  return (
    <section className="w-full md:w-auto md:max-w-full flex flex-col gap-4 px-6 pb-6">
      <SchoolContainer id={id} />
      <ProductContainer id={id} />
    </section>
  );
}
