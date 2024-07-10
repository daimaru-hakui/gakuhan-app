import { Timestamp } from "firebase/firestore";

export interface Student {
  id: string;
  schoolId: string;
  studentNumber: string;
  gender: string;
  lastName: string;
  firstName: string;
  schoolName: string;
  studentId: string;
  totalAmount: number;
  address: {
    zipCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
  };
  tel: string;
  products: {
    id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    cutLength: number;
    inseam: {
      price: number;
      isFlag: boolean;
      base: number;
    };
    subTotal: number;
  }[];
  email: string;
  startedAt: Timestamp;
  finishedAt: Timestamp | null;
}

export interface StudentProduct {
  name: string | undefined;
  price: number;
  size: string;
  color: string | null;
  quantity: number | undefined;
  cutLength: number | undefined;
  inseam: {
    price: number;
    base: number;
    isFlag: boolean;
  };
}[];
