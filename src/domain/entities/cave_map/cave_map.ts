import { CaveType } from "../../../constants/cave_type";
import { Position } from "../../../constants/position";
import { getRandomNumber } from "../../../helpers/utils/utils";
import { Cave } from "../cave";

export class CaveMap {
  constructor(
    public width: number,
    public height: number,
    public grid: Cave[][],
  ) { }

  public getRandomEmptyCave(): Position {
    let emptyCavePosition;
    let foundCave;
    do {
      emptyCavePosition = this.getRandomCavePosition();
      foundCave = this.grid[emptyCavePosition.y][emptyCavePosition.x];
    } while (foundCave.type !== CaveType.CAVE);
    return emptyCavePosition;
  }

  public getRandomCavePosition(): Position {
    return {
      x: getRandomNumber(this.height),
      y: getRandomNumber(this.width),
    };
  }

  public getSurroundingCaves(position: Position): Position[] {
    const surroundingX = [-1, 0, 1];
    const surroundingY = [-1, 0, 1];
    const surroundingCaves = [];
    for (const x of surroundingX) {
      for (const y of surroundingY) {
        const targetPosition = {
          x: position.x + x,
          y: position.y + y,
        };
        if (this.caveExistInMap(targetPosition)) {
          surroundingCaves.push(targetPosition);
        }
      }
    }
    return surroundingCaves;
  }

  public getCaveFromPosition(position: Position): Cave {
    return this.grid[position.y][position.x];
  }

  private caveExistInMap(position: Position): boolean {
    return (
      position.y >= 0 &&
      position.y < this.height &&
      position.x >= 0 &&
      position.x < this.width
    );
  }
}
