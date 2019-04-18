import { CaveType } from "../../constants/cave_type";
import { Direction } from "../../constants/direction";
import { GameStatus } from "../../constants/game_status";
import { Hint } from "../../constants/hint";
import { Cave } from "../../domain/entities/cave";
import { CaveMap } from "../../domain/entities/cave_map/cave_map";
import { GameEngine } from "./game_engine";

describe("gameEngine", () => {
  describe("hints", () => {
    it("returns no hints when only caves around", () => {
      const map = [
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave()],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);
      gameEngine.user.position = { x: 0, y: 0 };
      gameEngine.wumpus.position = { x: 2, y: 2 };
      const hints = gameEngine.getSurroundingHints();
      expect(hints.size).toEqual(0);
    });

    it("returns special hints", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(CaveType.BAT), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);

      gameEngine.user.position = { x: 1, y: 1 };
      const hints = gameEngine.getSurroundingHints();
      expect(hints.has(Hint.BAT)).toBeTruthy();
    });
    it("returns only surrounding hits", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(CaveType.BAT), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);

      gameEngine.user.position = { x: 0, y: 2 };
      gameEngine.wumpus.position = { x: 1, y: 1 };
      const hints = gameEngine.getSurroundingHints();
      expect(hints.size).toEqual(3);
      expect(hints.has(Hint.BAT)).toBeTruthy();
      expect(hints.has(Hint.PIT)).toBeTruthy();
      expect(hints.has(Hint.WUMPUS)).toBeTruthy();
    });
  });

  describe("moveUser", () => {
    it("should move properly", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(CaveType.PIT), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);

      gameEngine.user.position = { x: 0, y: 2 };
      gameEngine.moveUser(Direction.RIGHT);
      expect(gameEngine.user.position.x).toEqual(1);
      expect(gameEngine.user.position.y).toEqual(2);
    });
    it("should loose if user goes to a pit", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(CaveType.PIT), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);

      gameEngine.user.position = { x: 0, y: 2 };
      gameEngine.moveUser(Direction.UP);
      expect(gameEngine.user.position.x).toEqual(0);
      expect(gameEngine.user.position.y).toEqual(1);
      expect(gameEngine.gameStatus).toEqual(GameStatus.LOST);
    });
    it("should not move if targetCave does not exist", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(CaveType.PIT), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);

      gameEngine.user.position = { x: 0, y: 2 };
      gameEngine.moveUser(Direction.LEFT);
      expect(gameEngine.user.position.x).toEqual(0);
      expect(gameEngine.user.position.y).toEqual(2);
      expect(gameEngine.gameStatus).toEqual(GameStatus.IN_PROGRESS);
    });
    it("bat cave move to move to another location", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);
      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.moveUser(Direction.UP);
      const currentUserCave =
        gameEngine.map.grid[gameEngine.user.position.y][
        gameEngine.user.position.x
        ];
      expect(currentUserCave.type).toEqual(CaveType.CAVE);
    });

    it("shouldnt move if game is lost or won", () => {
      const map = [
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);
      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.moveUser(Direction.UP);
      expect(gameEngine.gameStatus).toEqual(GameStatus.LOST);
      gameEngine.moveUser(Direction.RIGHT);
      expect(gameEngine.user.position.x).toEqual(0);
      expect(gameEngine.user.position.y).toEqual(0);
    });

    it("should add arrows to total arrows if user moves to an arrow cave location", () => {
      const arrowCave = new Cave(CaveType.CAVE, 2);
      const map = [
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [arrowCave, new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 0);
      gameEngine.user.position = { x: 0, y: 2 };
      expect(gameEngine.user.arrowQuantity).toEqual(0);
      gameEngine.moveUser(Direction.UP);
      expect(gameEngine.user.arrowQuantity).toEqual(2);
      expect(arrowCave.arrowCount).toEqual(0);
      const surroundingHints = gameEngine.getSurroundingHints();
      expect(surroundingHints.has(Hint.ARROW_FOUND)).toBeTruthy();
    });
  });

  describe("user shoot", () => {
    it("should win if wumpus is killed", () => {
      const map = [
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 1);

      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.wumpus.position = { x: 1, y: 1 };
      gameEngine.userShoot(Direction.RIGHT);
      expect(gameEngine.gameStatus).toEqual(GameStatus.WON);
      expect(gameEngine.user.arrowQuantity).toEqual(0);
    });
    it("should stop shooting if game is over", () => {
      const map = [
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 2);

      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.wumpus.position = { x: 1, y: 1 };
      gameEngine.userShoot(Direction.RIGHT);
      gameEngine.userShoot(Direction.RIGHT);
      expect(gameEngine.gameStatus).toEqual(GameStatus.WON);
      expect(gameEngine.user.arrowQuantity).toEqual(1);
    });

    it("should move the wumpus to a random location if shot near", () => {
      const map = [
        [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [new Cave(), new Cave(), new Cave(CaveType.BAT)],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 2);

      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.wumpus.position = { x: 1, y: 1 };
      gameEngine.map.getRandomCavePosition = jest.fn().mockReturnValueOnce({ x: 2, y: 2 });
      gameEngine.userShoot(Direction.UP);
      expect(gameEngine.wumpus.position.x).toEqual(2);
      expect(gameEngine.wumpus.position.y).toEqual(2);
    });
  });

  describe("full game test", () => {
    it("should win", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [
          new Cave(CaveType.PIT),
          new Cave(CaveType.BAT),
          new Cave(),
        ],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 5);

      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.wumpus.position = { x: 2, y: 2 };
      gameEngine.moveUser(Direction.RIGHT);
      gameEngine.moveUser(Direction.RIGHT);
      gameEngine.moveUser(Direction.UP);
      gameEngine.userShoot(Direction.LEFT);
      gameEngine.userShoot(Direction.DOWN);
      gameEngine.moveUser(Direction.DOWN);
      gameEngine.userShoot(Direction.DOWN);
      expect(gameEngine.gameStatus).toEqual(GameStatus.WON);
      expect(gameEngine.user.arrowQuantity).toEqual(2);
      expect(gameEngine.user.position.x).toEqual(2);
      expect(gameEngine.user.position.y).toEqual(1);
    });
    it("should loose", () => {
      const map = [
        [new Cave(CaveType.BAT), new Cave(CaveType.BAT), new Cave()],
        [new Cave(), new Cave(), new Cave()],
        [
          new Cave(CaveType.PIT),
          new Cave(CaveType.BAT),
          new Cave(),
        ],
      ];
      const gameEngine = new GameEngine(new CaveMap(3, 3, map), 5);

      gameEngine.user.position = { x: 0, y: 1 };
      gameEngine.wumpus.position = { x: 2, y: 0 };
      gameEngine.moveUser(Direction.RIGHT);
      gameEngine.moveUser(Direction.RIGHT);
      gameEngine.moveUser(Direction.UP);
      gameEngine.userShoot(Direction.LEFT);
      gameEngine.userShoot(Direction.DOWN);
      gameEngine.moveUser(Direction.DOWN);
      gameEngine.moveUser(Direction.LEFT);
      gameEngine.moveUser(Direction.LEFT);
      gameEngine.moveUser(Direction.DOWN);
      expect(gameEngine.gameStatus).toEqual(GameStatus.LOST);
      expect(gameEngine.user.arrowQuantity).toEqual(3);
      expect(gameEngine.user.position.x).toEqual(0);
      expect(gameEngine.user.position.y).toEqual(2);
    });
  });
});
