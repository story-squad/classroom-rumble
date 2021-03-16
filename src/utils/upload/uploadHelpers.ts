export const isValidImage = (image: File): boolean => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/octet-stream',
  ];
  return validTypes.includes(image.type);
};
