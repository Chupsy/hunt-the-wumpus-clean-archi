import { GameStatus } from "../../../constants/game_status";
import { Hint } from "../../../constants/hint";
import { COMMANDS } from "./constants/commands";
import { GAME_STATUS } from "./constants/game_status";
import { HINTS } from "./constants/hints";

export class Translator {
  constructor(private language: string) { }

  public translateHints(hints: Hint[]): string[] {
    return hints
      .map((hint) =>
        HINTS[hint][this.language],
      );
  }

  public translateGameStatus(status: GameStatus): string {
    return GAME_STATUS[status][this.language];
  }

  public translateCommand(command: string): string {
    return COMMANDS[command][this.language];
  }
}
