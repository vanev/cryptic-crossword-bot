import * as Either from "fp-ts/Either";

export const fromString = (raw: string): Either.Either<Error, number> => {
  const refined = parseInt(raw, 10);

  if (Number.isNaN(refined)) {
    return Either.left(new Error(`Cannot parse ${raw} as a number.`));
  }

  return Either.right(refined);
};
