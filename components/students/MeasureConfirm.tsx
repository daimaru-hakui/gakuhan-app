import { CreateMeasureStudent } from "@/utils/schemas";

interface Props {
  values?: CreateMeasureStudent;
}

export default function MeasureConfirm({ values }: Props) {
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
    return (
      `￥${product.toLocaleString()} ` 
      // (cut > 0 && ` (内裾上代 ￥${cut.toLocaleString()})`)
    );
  }

  function calcTotalPrice(values: CreateMeasureStudent): number {
    const result = values.products.reduce((total, product) => {
      total +=
        product.quantity * product.price +
        product.quantity * product.inseam.price;
      return total;
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
            <span className="text-xl mt-2">円（税込）</span>
          </div>
        </div>
      )}
      <article className="text-xs space-y-1 mt-6">
        {values.products.map((product, index) => (
          <div key={index} className="border p-2 space-y-1">
            <div className="grid grid-cols-[80px_1fr]">
              <div className="font-semibold">商品名</div>
              <div>{product.name}</div>
            </div>
            {product.color && (
              <div className="grid grid-cols-[80px_1fr]">
                <div className="font-semibold">カラー</div>
                <div>{product.color}</div>
              </div>
            )}
            <div className="grid grid-cols-[80px_1fr]">
              <div className="font-semibold">サイズ</div>
              <div>{product.size}</div>
            </div>
            {product.cutLength > 0 && (
              <div className="grid grid-cols-[80px_1fr]">
                <div className="font-semibold">股下カット</div>
                <div>{`${product.cutLength}cm 股下修理代金${product.inseam.price}`}</div>
              </div>
            )}
            {product.quantity > 0 && (
              <div className="grid grid-cols-[80px_1fr]">
                <div className="font-semibold">数量</div>
                <div>{product.quantity}</div>
              </div>
            )}
            {product.quantity * product.price > 0 && (
              <div className="grid grid-cols-[80px_1fr]">
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
        ))}
      </article>
    </div>
  );
}
