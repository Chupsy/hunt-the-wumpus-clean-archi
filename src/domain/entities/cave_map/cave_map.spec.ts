import { CaveType } from "../../../constants/cave_type";
import { Cave } from "../cave";
import { CaveMap } from "./cave_map";
let map: CaveMap;
describe("CaveMap", () => {
  beforeEach(() => {
    map = new CaveMap(3, 3, [
      [new Cave(), new Cave(CaveType.BAT), new Cave(CaveType.BAT)],
      [new Cave(CaveType.PIT), new Cave(CaveType.BAT), new Cave(CaveType.PIT)],
      [new Cave(), new Cave(CaveType.BAT), new Cave(CaveType.BAT)],
    ]);
  });
  it("should return an empty cave", () => {
    const position = map.getRandomEmptyCave();
    const cave = map.grid[position.x][position.y];
    expect(cave instanceof Cave).toBeTruthy();
  });
  describe("getRandomPositionFromMap", () => {
    it("gives random position", () => {
      for (let i = 0; i < 10; i++) {
        const pos = map.getRandomCavePosition();
        expect(pos.x).toBeGreaterThanOrEqual(0);
        expect(pos.x).toBeLessThanOrEqual(2);
        expect(pos.y).toBeGreaterThanOrEqual(0);
        expect(pos.y).toBeLessThanOrEqual(2);
      }
    });
  });
  describe("getSurroundingCaves", () => {
    it("returns surrounding caves", () => {
      expect(map.getSurroundingCaves({ x: 0, y: 0 }).length).toEqual(4);
      expect(map.getSurroundingCaves({ x: 1, y: 1 }).length).toEqual(9);
      expect(map.getSurroundingCaves({ x: 0, y: 1 }).length).toEqual(6);
    });
  });

  describe("getCaveFromPosition", () => {
    it("returns cave at position", () => {
      expect(map.getCaveFromPosition({ x: 0, y: 1 }).type).toEqual(CaveType.PIT);
      expect(map.getCaveFromPosition({ x: 0, y: 0 }).type).toEqual(CaveType.CAVE);
      expect(map.getCaveFromPosition({ x: 2, y: 0 }).type).toEqual(CaveType.BAT);
    });
  });
});
