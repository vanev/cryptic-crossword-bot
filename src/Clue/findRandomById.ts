import { fromArray } from "fp-ts/NonEmptyArray";
import { Option, map } from "fp-ts/Option";
import { random } from "../NonEmptyArray.Extra";
import { ClueId, toString } from "../ClueId";
import { clues } from "../GeorgeHo";
import Clue from "./Clue";
import fromRow from "./fromRow";

const findRandomById = (id: ClueId): Promise<Option<Clue>> =>
  clues
    .select({ clue_number: toString(id) })
    .then((response) => response.data.rows)
    .then(fromArray)
    .then(map(random))
    .then(map(fromRow));

export default findRandomById;
