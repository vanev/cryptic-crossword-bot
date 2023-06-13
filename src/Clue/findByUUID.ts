import { head } from "fp-ts/Array";
import { Option, map } from "fp-ts/Option";
import { clues } from "../GeorgeHo";
import Clue from "./Clue";
import fromRow from "./fromRow";

const findByUUID = (uuid: number): Promise<Option<Clue>> =>
  clues
    .find(uuid)
    .then((response) => response.data.rows)
    .then(head)
    .then(map(fromRow));

export default findByUUID;
