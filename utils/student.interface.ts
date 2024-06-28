import { Timestamp } from "firebase/firestore";

export interface Student {
  id: string;
  schoolId: string;
  studentNumber: string;
  gender: string;
  lastName: string;
  firstName: string;
  totalAmount: number;
  address: {
    zipCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
  };
  products: {
    id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    inseam: {
      isUnNeededItem: boolean;
      cutLength: number;
      price: number;
      base: number;
    };
    subTotal: number;
  }[];
  email: string;
  startedAt: Timestamp;
  finishedAt: Timestamp | null;
}
