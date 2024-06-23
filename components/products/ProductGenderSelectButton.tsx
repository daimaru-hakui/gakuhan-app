import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { CreateProduct, UpdateProduct } from "@/utils/schemas";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface Props<T> {
  form: UseFormReturn<CreateProduct | UpdateProduct, any, undefined>;
}

export default function ProductGenderSelectButton<T>({ form }: Props<T>) {

  const genders: { id: "other" | "man" | "woman", label: string; }[] = [
    {
      id: "other",
      label: "Unisex"
    },
    {
      id: "man",
      label: "Mens",
    },
    {
      id: "woman",
      label: "Ledies"
    }
  ];

  return (
    <div>
      <Label>区分</Label>
      <div className="flex gap-3 mt-2">
        {genders.map(gender => (
          <Button
            key={gender.id}
            type="button"
            variant="outline"
            className={
              cn(form.watch("gender") === gender.id ? "border-2 border-primary" : "",
                "w-24 h-12"
              )}
            // asChild
            onClick={() => form.setValue("gender", gender.id)}
          >
            <div >
              {gender.label}
            </div>
          </Button>
        ))}
      </div >
    </div>
  );
};