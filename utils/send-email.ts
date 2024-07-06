import emailjs from '@emailjs/browser';
import { CreateMeasureStudent } from './schemas';
import { Student } from './student.interface';
import { calcSubTotalPrice, calcTotalPrice } from './calc';
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


  function divElement(
    label: string,
    value: string | number | null
  ): string | null {
    if (value) {
      return `
      <div style= "display: flex;" >
          <div style="width:100px;">${label}</div><div>${value}</div>
      </div>`;
    } else {
      return null;
    }
  };

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
    let array = [];
    const name = divElement("商品名", product.name);
    const color = divElement("カラー", product.color);
    const size = divElement("サイズ", product.size);
    const cutLength = divElement("股下カット", product.cutLength + 'cm');
    const inseamPrice = divElement("股下修理代", product.inseam.price + '円');
    const price = divElement("価格", product.price + '円');
    const quantity = divElement("数量", product.quantity);
    const subTotal = divElement("小計", calcSubTotalPrice({
      quantity: product.quantity,
      cutPrice: product.inseam.price,
      price: product.price
    }));

    array.push("<div style='margin-bottom:5px;'>");
    name ? array.push(name) : null;
    color ? array.push(color) : null;
    size ? array.push(size) : null;
    cutLength ? array.push(cutLength) : null;
    inseamPrice ? array.push(inseamPrice) : null;
    price ? array.push(price) : null;
    quantity ? array.push(quantity) : null;
    subTotal ? array.push(subTotal) : null;
    array.push("</div>");
    return array.join("");
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
    contents,
    totalAmount: calcTotalPrice(data, school)

  };
  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
  });
  emailjs.send(
    process.env.NEXT_PUBLIC_SERVICE_ID as string,
    process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
    { ...emailTemplate })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
}
