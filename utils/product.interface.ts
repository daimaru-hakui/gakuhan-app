export interface Product {
  id: string;
  gender: "other" | "man" | "woman";
  isRequire: boolean;
  description: string;
  quantity: {
    min: number;
    max: number;
  };
  items: {
    name: string;
    size: string[];
    color: string[];
    price: number;
    images: {
      productUrl: string;
      sizeUrl: string;
    };
    inseam: {
      isFlag: boolean;
      min: number;
      max: number;
      base: number;
      price: number;
      isUnNeededItem: boolean;
    };
  }[];
  sortNum: number;
}
