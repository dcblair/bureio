type ClassValue = string | undefined | boolean | null | ClassValue[];

// handles conditional rendering of classes
export const filterClasses = (...classes: ClassValue[]): string => {
  return classes.flat().filter(Boolean).join(" ");
};
