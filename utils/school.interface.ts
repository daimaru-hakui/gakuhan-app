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
  createdAt: Timestamp;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt: Timestamp;
}
