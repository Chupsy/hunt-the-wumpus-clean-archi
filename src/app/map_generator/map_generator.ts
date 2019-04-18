import { CaveType } from "../../constants/cave_type";
import { Cave } from "../../domain/entities/cave";
import { CaveMap } from "../../domain/entities/cave_map/cave_map";
import { subtractRandomItemFromArray } from "../../helpers/utils/utils";

export interface MapConfig {
  width: number;
  height: number;
  batCount: number;
  pitCount: number;
  lostArrowCount: number;
}

export class MapGenerator {
  public static generate(config: MapConfig): CaveMap {
    const map = [];
    const caveBucket = this.generateCaveBucket(config);
    for (let y = 0; y < config.height; y++) {
      const row = [];
      for (let x = 0; x < config.width; x++) {
        const randomCave = subtractRandomItemFromArray(caveBucket);
        row.push(randomCave);
      }
      map.push(row);
    }
    return new CaveMap(config.width, config.height, map);
  }
  private static generateCaveBucket(config: MapConfig): Cave[] {
    const totalCaveCount = config.width * config.height;
    const totalEmptyCaveCount =
      totalCaveCount - config.pitCount - config.batCount;
    if (totalEmptyCaveCount <= 0) {
      throw new Error("invalid_map_content");
    }
    const pitBucket = this.generateCavesFromType(config.pitCount, CaveType.PIT);
    const batBucket = this.generateCavesFromType(config.batCount, CaveType.BAT);
    const caveBucket = this.generateCavesFromType(
      totalEmptyCaveCount,
      CaveType.CAVE,
      config.lostArrowCount,
    );
    return caveBucket.concat(pitBucket, batBucket);
  }

  private static generateCavesFromType(
    numberOfCaves: number,
    caveType: CaveType,
    arrowCount = 0,
  ): Cave[] {
    const caveBucket: Cave[] = [];
    for (let i = 0; i < numberOfCaves; i++) {
      let caveArrows = 0;
      if (arrowCount > 0) {
        arrowCount--;
        caveArrows = 1;
      }
      const cave = new Cave(caveType, caveArrows);
      caveBucket.push(cave);
    }
    return caveBucket;
  }
}
