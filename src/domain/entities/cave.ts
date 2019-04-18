import { CaveType } from "../../constants/cave_type";

export class Cave {
  constructor(public type = CaveType.CAVE, public arrowCount = 0) { }
}
