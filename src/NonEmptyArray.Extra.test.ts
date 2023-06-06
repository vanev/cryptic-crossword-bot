import { random } from "./NonEmptyArray.Extra";

describe("NonEmptyArray.random", () => {
  it("returns a random item from the array", () => {
    // NOTE: We don't _actually_ want randomness in our tests, we want to
    // confirm the logic in the function works as expected so we're mocking
    // Math.random to always return this nice value.
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

    const actual = random(["foo", "bar", "baz"]);

    const expected = "foo";
    expect(actual).toEqual(expected);
  });
});
