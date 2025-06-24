export const getBrowserLanguage = (): string => {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language.split("-")[0];
  }
  return "en";
};
