import * as Either from "fp-ts/Either";

export enum Direction {
  Across = "a",
  Down = "d",
}

export const fromString = (raw: string): Either.Either<Error, Direction> => {
  const refined = raw.toLowerCase();

  switch (refined) {
    case Direction.Across:
    case Direction.Down:
      return Either.right(refined);

    default:
      return Either.left(new Error(`Cannot parse ${raw} as a direction.`));
  }
};
