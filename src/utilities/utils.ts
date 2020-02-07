export const capitalizeAllWord = (data: string) => {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
