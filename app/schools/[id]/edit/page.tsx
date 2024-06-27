import ProductContainer from "@/components/products/ProductContainer";
import SchoolContainer from "@/components/schools/edit/SchoolContainer";
import SchoolHeader from "@/components/schools/edit/SchoolHeader";

interface Props {
  params: {
    id: string;
  };
}

export default function SchoolPage({ params }: Props) {
  const id = params.id;
  return (
    <section className="w-full md:w-auto md:max-w-full flex flex-col gap-4 px-6 pb-6">
      <SchoolHeader id={id} />
      <SchoolContainer id={id} />
      <ProductContainer id={id} />
    </section>
  );
}
