import { getRandomNumber, subtractRandomItemFromArray } from "./utils";

describe("utils", () => {
  describe("getRandomNumber", () => {
    it("returns a random number lower than max", () => {
      for (var i = 0; i < 10; i++) {
        let randomNumber = getRandomNumber(6);
        expect(randomNumber).toBeLessThanOrEqual(5);
        expect(randomNumber).toBeGreaterThanOrEqual(0);
      }
    });
  });
  describe("subtractRandomItemFromArray", () => {
    it("removes random item from array and returns it", () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      let toRemove = array.length;
      for (var i = 0; i < toRemove; i++) {
        const item = subtractRandomItemFromArray(array);
        expect(item).toBeLessThanOrEqual(9);
        expect(item).toBeGreaterThanOrEqual(0);
        expect(array.length).toEqual(toRemove - i - 1);
      }
    });
  });
});
