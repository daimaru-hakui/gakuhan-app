import ProdcutEditContainer from "@/components/products/edit/ProdcutEditContainer";

interface Props {
  params: {
    id: string;
    productId: string;
  };
}

export default function ProductEditPage({ params }: Props) {
  const { id, productId } = params;
  return (
    <div className="w-full md:w-auto pb-6">
      <ProdcutEditContainer id={id} productId={productId} />
    </div>
  );
}
