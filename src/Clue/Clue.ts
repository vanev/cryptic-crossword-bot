import { ClueId } from "../ClueId";
import { Direction } from "../Direction";

class Clue {
  readonly id: ClueId;
  readonly clue: string;
  readonly answer: string;
  readonly puzzleId: string;
  readonly uuid: number;

  constructor(
    id: ClueId,
    clue: string,
    answer: string,
    puzzleId: string,
    uuid: number
  ) {
    this.id = id;
    this.clue = clue;
    this.answer = answer;
    this.puzzleId = puzzleId;
    this.uuid = uuid;
  }

  get index(): number {
    return this.id.index;
  }

  get direction(): Direction {
    return this.id.direction;
  }
}

export default Clue;
