import { CaveType } from "../../constants/cave_type";
import { MapConfig, MapGenerator } from "./map_generator";
const defaultConfig: MapConfig = {
  lostArrowCount: 1,
  batCount: 3,
  height: 3,
  pitCount: 3,
  width: 3,
};

describe("map_generator", () => {
  it("should initialize CaveMap", () => {
    const map = MapGenerator.generate(defaultConfig);
    expect(map.grid.length).toEqual(defaultConfig.height);
    expect(map.grid[0].length).toEqual(defaultConfig.width);
    const count = {
      arrows: 0,
      bat: 0,
      cave: 0,
      pit: 0,
    };
    map.grid.forEach((row) => {
      row.forEach((cave) => {
        if (cave.type === CaveType.BAT) {
          count.bat++;
        } else if (cave.type === CaveType.PIT) {
          count.pit++;
        } else {
          count.cave++;
        }
        if (cave.arrowCount > 0) {
          count.arrows++;
        }
      });
    });
    expect(count.pit).toEqual(defaultConfig.pitCount);
    expect(count.bat).toEqual(defaultConfig.batCount);
    const targetCaveCount =
      defaultConfig.width * defaultConfig.height -
      defaultConfig.pitCount -
      defaultConfig.batCount;
    expect(count.cave).toEqual(targetCaveCount);
    expect(count.arrows).toEqual(defaultConfig.lostArrowCount);
  });
  it("should refuse cave with no empty cave", () => {
    expect(() =>
      MapGenerator.generate({
        batCount: 8,
        height: 3,
        pitCount: 1,
        width: 3,
        lostArrowCount: 1,
      }),
    ).toThrow("invalid_map_content");
  });
});
