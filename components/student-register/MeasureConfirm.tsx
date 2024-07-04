import { CreateMeasureStudent } from "@/utils/schemas";
import { School } from "@/utils/school.interface";

interface Props {
  values?: CreateMeasureStudent;
  school: School;
}

export default function MeasureConfirm({ values, school }: Props) {
  if (!values) return;

  function calcSubTotalPrice({
    quantity,
    price,
    cutPrice,
  }: {
    quantity: number;
    price: number;
    cutPrice: number;
  }) {
    const product = quantity * price;
    const cut = quantity * cutPrice;
    const sum = product + cut;
    return (
      `${sum.toLocaleString()}円`
    );
  }

  function calcTotalPrice(values: CreateMeasureStudent): number {
    const result = values.products.reduce((total, product) => {
      total +=
        product.quantity * product.price +
        product.quantity * (product.cutLength > 0 ? product.inseam.price : 0);
      const shippingFee = school.isShipping ? school.shippingFee : 0;
      return total + shippingFee;
    }, 0);
    return result;
  }

  return (
    <div>
      <header>
        <h1 className="font-bold text-xl">明細確認</h1>
        <p className="mt-2 text-muted-foreground">
          採寸項目の確認をお願いします。
        </p>
        <p className="text-destructive font-semibold text-sm mt-2">
          ※まだ登録が完了してません。
        </p>
        <p className="text-destructive font-semibold text-sm">
          ※下記、登録ボタンを押して完了してください。
        </p>
      </header>
      {calcTotalPrice(values) > 0 && (
        <div className="mt-4 flex gap-3 items-center justify-center">
          <div className="text-xl font-semibold mt-2">合計</div>
          <div className="flex items-center gap-2">
            <div className="text-4xl font-semibold">
              {calcTotalPrice(values).toLocaleString()}
            </div>
            <span className="text-xl font-semibold mt-2">円（税込）</span>
          </div>
        </div>
      )}
      {school.isShipping && school.shippingFee > 0 &&
        <div className="flex justify-center gap-3 text-sm mt-2">
          <div>内送料</div>
          <div className="mr-12">{school.shippingFee} 円</div>
        </div>
      }
      <article className="text-xs space-y-1 mt-6">
        {values.products.map((product, index) => (
          product.name && (
            <div key={index} className="border p-2 space-y-1">
              <div className="grid grid-cols-[90px_1fr]">
                <div className="font-semibold">商品名</div>
                <div>{product.name}</div>
              </div>
              {product.color && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">カラー</div>
                  <div>{product.color}</div>
                </div>
              )}
              <div className="grid grid-cols-[90px_1fr]">
                <div className="font-semibold">サイズ</div>
                <div>{product.size}</div>
              </div>
              {product.cutLength > 0 && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">股下カット</div>
                  <div>{`${product.cutLength}cm`}</div>
                </div>
              )}
              {product.inseam.price > 0 && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">股下代金</div>
                  <div>{`${product.inseam.price}円`}</div>
                </div>
              )}
              {product.price > 0 && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">価格</div>
                  <div>{`${product.price}円`}</div>
                </div>
              )}
              {product.quantity > 0 && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">数量</div>
                  <div>{product.quantity}</div>
                </div>
              )}
              {product.quantity * product.price > 0 && (
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="font-semibold">小計</div>
                  <div>
                    {calcSubTotalPrice({
                      quantity: product.quantity,
                      price: product.price,
                      cutPrice: product.inseam.price,
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        ))}
      </article>
    </div>
  );
}
