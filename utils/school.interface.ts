import { Timestamp } from "firebase/firestore";

export interface School {
  id: string;
  title: string;
  scheduledDate: Timestamp;
  description: string;
  isGender: boolean;
  isAddress: boolean;
  isShipping: boolean;
  shippingFee: number;
  signature: string;
  createdAt: Timestamp;
  isPayment: boolean;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt: Timestamp;
}
