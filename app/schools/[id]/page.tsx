import ProductContainer from "./ProductContainer";
import { ProductCreateModal } from "./ProductCreateModal";
import SchoolContainer from "./SchoolContainer";
import SchoolShow from "./SchoolContainer";

export default function SchoolPage() {
  return (
    <div>
      <SchoolContainer />
      <ProductContainer />
      <ProductCreateModal />
    </div>
  );
}