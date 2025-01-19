export type RequiredKeys<T extends object, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
