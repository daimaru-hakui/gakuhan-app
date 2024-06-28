import { Timestamp } from "firebase/firestore";

export interface Student {
    id: string;
    studentNumber: string;
    gender: string;
    lastName: string;
    firstName: string;
    address: {
        zipCode: string;
        prefecture: string;
        city: string;
        street: string;
        building: string;
    };
    products: [];
    startedAt: Timestamp;
    finishedAt: Timestamp | null;
}