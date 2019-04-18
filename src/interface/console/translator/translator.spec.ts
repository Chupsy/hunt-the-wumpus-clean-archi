import { GameStatus } from "../../../constants/game_status";
import { Hint } from "../../../constants/hint";
import { COMMANDS } from "./constants/commands";
import { GAME_STATUS } from "./constants/game_status";
import { HINTS } from "./constants/hints";
import { Translator } from "./translator";

describe("translator", () => {
  it("translates hints", () => {
    const translator = new Translator("FR");
    const hintsTranslated = translator.translateHints([
      Hint.BAT,
      Hint.PIT,
      Hint.WUMPUS,
    ]);
    expect(hintsTranslated[0]).toEqual(HINTS[Hint.BAT].FR);
    expect(hintsTranslated[1]).toEqual(HINTS[Hint.PIT].FR);
    expect(hintsTranslated[2]).toEqual(HINTS[Hint.WUMPUS].FR);
  });
  it("translates gameStatus", () => {
    const translator = new Translator("FR");
    const gameStatusTranslated = translator.translateGameStatus(
      GameStatus.IN_PROGRESS,
    );
    expect(gameStatusTranslated).toEqual(
      GAME_STATUS[GameStatus.IN_PROGRESS].FR,
    );
  });
  it("translates commands", () => {
    const translator = new Translator("FR");
    const commandTranslated = translator.translateCommand("MOVE");
    expect(commandTranslated).toEqual(COMMANDS.MOVE.FR);
  });
});
