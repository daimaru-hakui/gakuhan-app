const paths = {
  home() {
    return "/";
  },
  productEdit({
    schoolId,
    productId,
  }: {
    schoolId: string;
    productId: string;
  }) {
    return `/schools/${schoolId}/products/${productId}/edit`;
  },
  schoolAll() {
    return `/schools`;
  },
  schoolShow(id: string) {
    return `/schools/${id}`;
  },
  schoolEdit(id: string) {
    return `/schools/${id}/edit`;
  },
  adminAll() {
    return `/admin`;
  },
  accountShow(id: string) {
    return `/account/${id}`;
  },
};

export default paths;
