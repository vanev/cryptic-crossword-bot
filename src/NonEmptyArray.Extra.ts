import { NonEmptyArray } from "fp-ts/NonEmptyArray";

export const random = <T>(arr: NonEmptyArray<T>): T =>
  arr[Math.floor(Math.random() * arr.length)];
