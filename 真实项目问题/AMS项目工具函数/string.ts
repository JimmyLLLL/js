export const toHump = (key: string) =>
  key.replace(/_(\w)/g, (all: string, letter: string) => letter.toUpperCase());

export const toUnderLine = (key: string) =>
  key.replace(/([A-Z])/g, "_$1").toLowerCase();
