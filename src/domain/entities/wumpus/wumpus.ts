import { Position } from "../../../constants/position";

export class Wumpus {
    constructor(public position: Position) {
    }

    public isAtPosition(position: Position): boolean {
        return this.position.x === position.x
            && this.position.y === position.y;
    }
}
