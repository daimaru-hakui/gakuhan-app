import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCreateModal } from "./ProductCreateModal";

export default function ProductContainer({ id }: { id: string }) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="whitespace-pre-line">商品</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductCreateModal />
        </CardContent>
      </Card>
    </section>
  );
}
