import emailjs from '@emailjs/browser';
import { CreateMeasureStudent } from './schemas';
import { Student } from './student.interface';
import { calcTotalPrice } from './calc';
import { School } from './school.interface';

export interface TemplateParams {
  studentNumber: string;
  gender: string;
  lastName: string;
  firstName: string;
  schoolName: string;
  totalAmount: number;
  zipCode: string;
  address: string;
  tel: string;
  email: string;
  contents: string;
}

export async function sendEmail(
  data: CreateMeasureStudent,
  student: Student,
  school: School
): Promise<void> {
  const {
    studentNumber,
    gender,
    lastName,
    firstName,
    schoolName,
    address,
    tel,
    email
  } = student;
  const contents = data.products.map(product => {
    return product;
  });
  const emailTemplate = {
    studentNumber,
    gender: gender === "man" ? "男性" : gender === "woman" ? "女性" : "",
    lastName,
    firstName,
    schoolName,
    zipCode: address.zipCode,
    address: address.prefecture + address.city + address.street + address.building,
    tel,
    email,
    contents: "",
    totalAmount: calcTotalPrice(data, school)

  };
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ...emailTemplate }).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );
}
