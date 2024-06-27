interface GetAddress {
  message: string | null;
  results:
    | {
        address1: string;
        address2: string;
        address3: string;
        kana1: string;
        kana2: string;
        kana3: string;
        prefcode: number;
        zipcode: string;
      }[]
    | null;
  status: number;
}

export async function getAddress(code: string): Promise<GetAddress> {
  const zipCode = code
    .replace(/[０-９]/g, function (s: any) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    })
    .replace(/[- ー]/g, "");
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.log("取得に失敗");
  }
  const data = await res.json();
  return data;
}
