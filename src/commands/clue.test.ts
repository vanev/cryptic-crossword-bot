import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { some, none } from "fp-ts/Option";
import { Clue, findRandomById } from "../Clue";
import { Direction } from "../Direction";
import clue from "./clue";

jest.mock("../Clue", () => {
  const actual = jest.requireActual("../Clue");

  return {
    ...actual,
    findRandomById: jest.fn(),
  };
});

const mockFindRandomById = findRandomById as jest.MockedFn<
  typeof findRandomById
>;

beforeEach(() => {
  mockFindRandomById.mockReset();
});

describe("clue.execute", () => {
  describe("when the clue_id option is null", () => {
    it("replies with a missing option error", () => {
      const interaction = {
        options: {
          getString: (key: string) => {
            expect(key).toEqual("clue_id");
            return null;
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return clue
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Missing required option: clue_id",
            ephemeral: true,
          });
        });
    });
  });

  describe("when the clue_id option is not a valid clue id string", () => {
    it("replies with an invalid clue id error", () => {
      const interaction = {
        options: {
          getString: (key: string) => {
            expect(key).toEqual("clue_id");
            return "one across";
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return clue
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Cannot parse one across as a clue id.",
            ephemeral: true,
          });
        });
    });
  });

  describe("when there are no clues for the id", () => {
    it("replies with a cannot find clue error", () => {
      mockFindRandomById.mockResolvedValue(none);

      const interaction = {
        options: {
          getString: (key: string) => {
            expect(key).toEqual("clue_id");
            return "1a";
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return clue
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith({
            content: "Cannot find clue with id 1a.",
            ephemeral: true,
          });
        });
    });
  });

  describe("when there are clues for the id", () => {
    it("replies with a clue", () => {
      mockFindRandomById.mockResolvedValue(
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
            expect(key).toEqual("clue_id");
            return "1a";
          },
        },
        reply: jest.fn().mockResolvedValue(undefined),
      };

      return clue
        .execute(
          interaction as unknown as ChatInputCommandInteraction<CacheType>
        )
        .then(() => {
          expect(interaction.reply).toHaveBeenCalledWith(
            "UUID: 1 🔎 Touchy having failed to finish exam (4)"
          );
        });
    });
  });
});
