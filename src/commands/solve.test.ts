import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { some, none } from "fp-ts/Option";
import { Clue, findByUUID } from "../Clue";
import { Direction } from "../Direction";
import solve from "./solve";

jest.mock("../Clue", () => {
  const actual = jest.requireActual("../Clue");

  return {
    ...actual,
    findByUUID: jest.fn(),
  };
});

const mockFindByUUID = findByUUID as jest.MockedFn<typeof findByUUID>;

beforeEach(() => {
  mockFindByUUID.mockReset();
});

describe("solve.execute", () => {
  describe("when the uuid option is null", () => {
    it("replies with a missing option error", () => {
      const interaction = {
        options: {
          getString: (key: string) => {
            expect(key).toEqual("uuid");
            return null;
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return solve
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Missing required option: uuid",
            ephemeral: true,
          });
        });
    });
  });

  describe("when the uuid option is not a number", () => {
    it("replies with an invalid number error", () => {
      const interaction = {
        options: {
          getString: (key: string) => {
            expect(key).toEqual("uuid");
            return "hello";
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return solve
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Cannot parse hello as a number.",
            ephemeral: true,
          });
        });
    });
  });

  describe("when the answer option is null", () => {
    it("replies with a missing option error", () => {
      const interaction = {
        options: {
          getString: (key: string) => {
            switch (key) {
              case "uuid":
                return "1";

              case "answer":
                return null;

              default:
                throw new Error(`Unexpected key: ${key}`);
            }
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return solve
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Missing required option: answer",
            ephemeral: true,
          });
        });
    });
  });

  describe("when there is no clue for the uuid", () => {
    it("replies with a cannot find clue error", () => {
      mockFindByUUID.mockResolvedValue(none);

      const interaction = {
        options: {
          getString: (key: string) => {
            switch (key) {
              case "uuid":
                return "1";

              case "answer":
                return "HELLO";

              default:
                throw new Error(`Unexpected key: ${key}`);
            }
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return solve
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Cannot find clue with uuid 1.",
            ephemeral: true,
          });
        });
    });
  });

  describe("when there is a clue for the uuid", () => {
    describe("when the answer is incorrect", () => {
      it("replies with a clue", () => {
        mockFindByUUID.mockResolvedValue(
          some(
            new Clue(
              { index: 1, direction: Direction.Across },
              "Touchy having failed to finish exam (4)",
              "TEST",
              "Test Cryptic Puzzle_2022-01-01",
              1
            )
          )
        );

        const interaction = {
          options: {
            getString: (key: string) => {
              switch (key) {
                case "uuid":
                  return "1";

                case "answer":
                  return "WRONG";

                default:
                  throw new Error(`Unexpected key: ${key}`);
              }
            },
          },
          reply: jest.fn().mockResolvedValue(undefined),
          user: {
            username: "test_user",
          },
        };

        return solve
          .execute(
            interaction as unknown as ChatInputCommandInteraction<CacheType>
          )
          .then(() => {
            expect(interaction.reply).toHaveBeenCalledWith(
              `❌ test_user submitted an **incorrect** solution: ||WRONG||.`
            );
          });
      });
    });

    describe("when the answer is correct", () => {
      it("replies with a clue", () => {
        mockFindByUUID.mockResolvedValue(
          some(
            new Clue(
              { index: 1, direction: Direction.Across },
              "Touchy having failed to finish exam (4)",
              "TEST",
              "Test Cryptic Puzzle_2022-01-01",
              1
            )
          )
        );

        const interaction = {
          options: {
            getString: (key: string) => {
              switch (key) {
                case "uuid":
                  return "1";

                case "answer":
                  return "TEST";

                default:
                  throw new Error(`Unexpected key: ${key}`);
              }
            },
          },
          reply: jest.fn().mockResolvedValue(undefined),
          user: {
            username: "test_user",
          },
        };

        return solve
          .execute(
            interaction as unknown as ChatInputCommandInteraction<CacheType>
          )
          .then(() => {
            expect(interaction.reply).toHaveBeenCalledWith(
              `✅ test_user submitted a **correct** solution: ||TEST||.`
            );
          });
      });
    });
  });
});
