import { Position } from "../../../constants/position";
import { UserError } from "../../../error/constants/user_error";

export class User {

  constructor(public position: Position, public arrowQuantity: number) {
  }

  public shoot(): void {
    if (!this.canShoot()) {
      throw new Error(UserError.ARROW_QUANTITY_TOO_LOW);
    }
    this.arrowQuantity -= 1;
  }

  public canShoot(): boolean {
    return this.arrowQuantity > 0;
  }
}
