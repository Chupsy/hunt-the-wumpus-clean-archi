import { Wumpus } from "./wumpus";
describe("wumpus", () => {
    it("should return if position is same as the wumpus", () => {
        const wumpus = new Wumpus({ x: 1, y: 1 });
        expect(wumpus.isAtPosition({ x: 1, y: 1 })).toBeTruthy();
        expect(wumpus.isAtPosition({ x: 0, y: 1 })).toBeFalsy();
    });
});
