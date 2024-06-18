import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCreateModal } from "./ProductCreateModal";

export default function ProductContainer() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>商品</CardTitle>
        </CardHeader>
        <CardContent>

          <ProductCreateModal />
        </CardContent>
      </Card>
    </section>
  );
}