import * as Apply from "fp-ts/Apply";
import * as Either from "fp-ts/Either";
import * as Direction from "./Direction";
import * as Number from "./Number.Extra";

const PATTERN = /(\d+)([ADad])/;

export type ClueId = {
  index: number;
  direction: Direction.Direction;
};

export const fromString = (str: string): Either.Either<Error, ClueId> => {
  const match = str.match(PATTERN);

  if (!match) {
    return Either.left(new Error(`Cannot parse ${str} as a clue id.`));
  }

  const [_, rawIndex, rawDirection] = match;

  return Apply.sequenceS(Either.Apply)({
    index: Number.fromString(rawIndex),
    direction: Direction.fromString(rawDirection),
  });
};

export const toString = ({ index, direction }: ClueId): string =>
  `${index}${direction}`;
