export const getAge = (dateString: Date | string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};
