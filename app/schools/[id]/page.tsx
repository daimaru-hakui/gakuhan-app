import ProductContainer from "./ProductContainer";
import SchoolContainer from "./SchoolContainer";

export default function SchoolPage() {
  return (
    <section className="w-full max-w-[600px] grid gap-cols-1 gap-3">
      <SchoolContainer />
      <ProductContainer />
    </section>
  );
}