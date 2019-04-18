import { CaveType } from "../../constants/cave_type";
import { Direction } from "../../constants/direction";
import { GameStatus } from "../../constants/game_status";
import { Hint } from "../../constants/hint";
import { Position } from "../../constants/position";
import { CaveMap } from "../../domain/entities/cave_map/cave_map";
import { User } from "../../domain/entities/user/user";
import { Wumpus } from "../../domain/entities/wumpus/wumpus";

export class GameEngine {
  public user: User;
  public gameStatus: GameStatus;
  public wumpus: Wumpus;
  private notification: Hint[];

  constructor(public map: CaveMap, arrowCount: number) {
    this.gameStatus = GameStatus.IN_PROGRESS;
    this.user = new User(this.map.getRandomEmptyCave(), arrowCount);
    this.wumpus = new Wumpus(this.map.getRandomCavePosition());
    this.notification = [];
  }

  public moveUser(direction: Direction): void {
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      return;
    }
    this.changeUserPosition(
      this.getPositionForDirection(this.user.position, direction),
    );
  }

  public getSurroundingHints(): Set<Hint> {
    const surroundingCavePositions = this.map.getSurroundingCaves(this.user.position);
    const surroundingHints = new Set<Hint>();
    surroundingCavePositions.forEach((position) => {
      const cave = this.map.getCaveFromPosition(position);
      if (cave.type !== CaveType.CAVE) {
        surroundingHints.add(cave.type as string as Hint);
      }
      if (this.wumpus.isAtPosition(position)) {
        surroundingHints.add(Hint.WUMPUS);
      }
    });
    this.notification.forEach((hint) => surroundingHints.add(hint));
    this.notification = [];
    return surroundingHints;
  }

  public userShoot(direction: Direction): void {
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      return;
    }
    const position = this.getPositionForDirection(this.user.position, direction);
    const targetCave = this.map.grid[position.y][position.x];
    if (targetCave && this.user.canShoot()) {
      this.user.shoot();
      if (this.wumpus.isAtPosition(position)) {
        this.gameStatus = GameStatus.WON;
      } else {
        const wumpusIsNear = this.map.getSurroundingCaves(this.user.position)
          .reduce((HasWumpus, cavePosition) => HasWumpus || this.wumpus.isAtPosition(cavePosition), false);
        if (wumpusIsNear) {
          this.wumpus.position = this.map.getRandomCavePosition();
        }
      }
    }
  }

  private changeUserPosition(position: Position): void {
    const newUserCave = this.map.grid[position.y][position.x];
    if (newUserCave) {
      this.user.position = position;
      this.gameStatus =
        newUserCave.type === CaveType.PIT
          ? GameStatus.LOST
          : GameStatus.IN_PROGRESS;
      if (newUserCave.arrowCount > 0) {
        this.user.arrowQuantity += newUserCave.arrowCount;
        newUserCave.arrowCount = 0;
        this.notification.push(Hint.ARROW_FOUND);
      }
      if (newUserCave.type === CaveType.BAT) {
        this.changeUserPosition(this.map.getRandomCavePosition());
      }
    }
  }

  private getPositionForDirection(
    position: Position,
    direction: Direction,
  ): Position {
    const newPosition = {
      x: position.x,
      y: position.y,
    };
    switch (direction) {
      case Direction.RIGHT:
        newPosition.x += 1;
        break;
      case Direction.LEFT:
        newPosition.x -= 1;
        break;
      case Direction.UP:
        newPosition.y -= 1;
        break;
      case Direction.DOWN:
        newPosition.y += 1;
        break;
    }
    return newPosition;
  }
}
