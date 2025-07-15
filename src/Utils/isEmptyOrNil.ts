export const isEmptyOrNil = (value: string | undefined | null): boolean => {
    return value === undefined || value === null || value.toString().trim() === "";
  };