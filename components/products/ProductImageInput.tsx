import { CreateProduct } from "@/utils/schemas";
import { UseFormReturn } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import MediaModal from "../media/MediaModal";
import Image from "next/image";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
  index: number;
}
export default function ProductImageInput({ form, index }: Props) {
  function handleClickImageProduct(url: string) {
    form.setValue(`items.${index}.images.productUrl`, url);
  }

  function handleClickImageSize(url: string) {
    form.setValue(`items.${index}.images.sizeUrl`, url);
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <h3 className="text-sm mb-2">イメージ画像</h3>
        {form.getValues(`items.${index}.images.productUrl`) ? (
          <div className="relative">
            <Image
              src={form.getValues(`items.${index}.images.productUrl`)}
              alt=""
              width={150}
              height={150}
              className="w-full object-cover"
            />
            <RiCloseCircleFill
              size={24}
              className="absolute top-[-10px] right-[-10px] bg-white rounded-full cursor-pointer"
              onClick={() =>
                form.setValue(`items.${index}.images.productUrl`, "")
              }
            />
          </div>
        ) : (
          <MediaModal
            text="image画像を追加する"
            handleClickImageSelect={handleClickImageProduct}
          />
        )}
      </div>
      <div className="w-full">
        <h3 className="text-sm mb-2">サイズ画像</h3>
        {form.getValues(`items.${index}.images.sizeUrl`) ? (
          <div className="relative">
            <Image
              src={form.getValues(`items.${index}.images.sizeUrl`)}
              alt=""
              width={150}
              height={150}
              className="w-full object-cover"
            />
            <RiCloseCircleFill
              size={24}
              className="absolute top-[-10px] right-[-10px] bg-white rounded-full cursor-pointer"
              onClick={() => form.setValue(`items.${index}.images.sizeUrl`, "")}
            />
          </div>
        ) : (
          <MediaModal
            text="size画像を追加する"
            handleClickImageSelect={handleClickImageSize}
          />
        )}
      </div>
    </div>
  );
}
