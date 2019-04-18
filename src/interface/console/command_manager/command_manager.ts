import { GameManager } from "../game_manager/game_manager";
import { Translator } from "../translator/translator";
import { CONFIG } from "./constants/config";
import { MOVE } from "./constants/move";
import { SHOOT } from "./constants/shoot";

export class CommandManager {
  constructor(
    private gameManager: GameManager,
    private translator: Translator,
  ) {
    this.addMoveCommands();
    this.addShootCommands();
    this.addConfigCommands();
    gameManager.addCommandDisplay(this.getCommandDescriptions());
  }

  private addMoveCommands() {
    Object.keys(MOVE).forEach((direction) => {
      this.gameManager.addCommand(MOVE[direction], () =>
        this.gameManager.move(direction),
      );
    });
  }

  private addShootCommands() {
    Object.keys(SHOOT).forEach((direction) => {
      this.gameManager.addCommand(SHOOT[direction], () => {
        this.gameManager.shoot(direction);
      });
    });
  }

  private addConfigCommands() {
    this.gameManager.addCommand(CONFIG.LEAVE, () => {
      process.exit(0);
    });
    this.gameManager.addCommand(CONFIG.RESTART, () => {
      this.gameManager.restart();
    });
  }
  private getCommandDescriptions() {
    const translatedMoves =
      this.translator.translateCommand("MOVE") +
      Object.keys(MOVE)
        .map((d) => MOVE[d])
        .reduce((commands, dir) => commands.concat(dir), [])
        .join();
    const translatedShoot =
      this.translator.translateCommand("SHOOT") +
      Object.keys(SHOOT)
        .map((d) => SHOOT[d])
        .reduce((commands, dir) => commands.concat(dir), [])
        .join();
    const translatedLeave =
      this.translator.translateCommand("LEAVE") + CONFIG.LEAVE.join();
    const translatedRestart =
      this.translator.translateCommand("RESTART") + CONFIG.RESTART.join();
    return [
      translatedMoves,
      translatedShoot,
      translatedLeave,
      translatedRestart,
    ];
  }
}
