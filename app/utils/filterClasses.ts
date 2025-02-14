type ClassValue = string | number | boolean | undefined | null | ClassValue[];

// handles conditional rendering of classes
export const filterClasses = (...classes: ClassValue[]): string => {
  return classes.flat().filter(Boolean).join(" ");
};
