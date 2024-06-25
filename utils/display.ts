export function getGenderDisplay(gender: string) {
  switch (gender) {
    case "other":
      return "男女兼用";
    case "man":
      return "男性用";
    case "woman":
      return "女性用";
    default:
      return;
  }
}
