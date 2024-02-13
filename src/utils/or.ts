export const or =
  <T extends unknown[]>(
    f1: (...args: T) => boolean,
    f2: (...args: T) => boolean
  ) =>
  (...args: T) =>
    f1(...args) || f2(...args);
