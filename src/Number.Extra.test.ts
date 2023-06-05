import { right, left } from "fp-ts/Either";
import { fromString } from "./Number.Extra";

describe("Number.fromString", () => {
  describe("when the string is a number", () => {
    it("returns a right of the number", () => {
      const actual = fromString("10");

      const expected = right(10);
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is not a number", () => {
    it("returns a left of a parse error", () => {
      const actual = fromString("hello");

      const expected = left(new Error("Cannot parse hello as a number."));
      expect(actual).toEqual(expected);
    });
  });
});
