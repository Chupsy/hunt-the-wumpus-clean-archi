import { GameEngine } from "../../../app/game_engine/game_engine";
import { MapGenerator } from "../../../app/map_generator/map_generator";
import { Direction } from "../../../constants/direction";
import { ScreenManager } from "../screen_manager/screen_manager";
import { Translator } from "../translator/translator";

export class GameManager {
  private gameEngine: GameEngine;
  private screenManager: ScreenManager;

  constructor(
    private mapConfig: {
      width: number;
      height: number;
      batCount: number;
      pitCount: number;
      lostArrowCount: number;
    },
    private arrowCount: number,
    private translator: Translator,
  ) {
    this.screenManager = new ScreenManager(
      this.mapConfig.width,
      this.mapConfig.height,
    );
    this.restart();
  }

  public move(direction: string) {
    this.gameEngine.moveUser((direction as unknown) as Direction);
    this.updateRender();
  }

  public shoot(direction: string) {
    this.gameEngine.userShoot((direction as unknown) as Direction);
    this.updateRender();
  }
  public restart() {
    this.gameEngine = new GameEngine(
      MapGenerator.generate(this.mapConfig),
      this.arrowCount,
    );
    this.updateRender();
  }

  public addCommand(commandInfos: string[], exec: () => void) {
    this.screenManager.addCommand(commandInfos, exec);
  }

  public addCommandDisplay(commandInfos: string[]) {
    this.screenManager.commandDisplay.update(commandInfos);
  }

  public updateRender() {
    this.screenManager.mapDisplay.update(
      this.gameEngine.user.position,
      this.gameEngine.user.arrowQuantity,
      this.translator.translateGameStatus(this.gameEngine.gameStatus),
    );
    this.screenManager.hintDisplay.update(
      this.translator.translateHints(
        Array.from(this.gameEngine.getSurroundingHints().values()),
      ),
    );
  }
}
