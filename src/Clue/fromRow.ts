import { isLeft } from "fp-ts/Either";
import { fromString } from "../ClueId";
import Clue from "./Clue";

const fromRow = ([
  rowid,
  clue,
  answer,
  definition,
  clue_number,
  puzzle_date,
  puzzle_name,
  source_url,
  source,
]: [
  number,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null
]): Clue => {
  if (!clue || !answer || !clue_number || !puzzle_date || !puzzle_name) {
    throw new Error("Missing required value.");
  }

  const id = fromString(clue_number);

  if (isLeft(id)) {
    throw new Error("Cannot create a clue with an invalid id.");
  }

  return new Clue(
    id.right,
    clue,
    answer,
    `${puzzle_name}_${puzzle_date}`,
    rowid
  );
};

export default fromRow;
