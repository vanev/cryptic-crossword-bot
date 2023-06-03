import dotenv from "dotenv";

dotenv.config();

export class MissingRequired extends Error {
  constructor(key: string) {
    super(`Missing required variable, ${key}, in environment.`);
  }
}

export const get = (key: string): string | undefined => process.env[key];

export const getRequired = (key: string): string => {
  const value = get(key);

  if (!value) throw new MissingRequired(key);

  return value;
};

export const getOr = (key: string, alt: string): string => get(key) || alt;
