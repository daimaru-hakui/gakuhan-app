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
  schoolShow(id: string) {
    return `/schools/${id}`;
  },
  schoolEdit(id: string) {
    return `/schools/${id}/edit`;
  },
};

export default paths;
