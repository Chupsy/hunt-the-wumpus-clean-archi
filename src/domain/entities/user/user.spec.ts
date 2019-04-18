import { User } from "./user";
import { UserError } from "../../../error/constants/user_error";

describe("User spec", () => {
  it("has the given stats when initialized", () => {
    const position = { x: 1, y: 1 };
    const arrowQuantity = 5;
    const u = new User(position, arrowQuantity);
    expect(u.position.x).toEqual(position.x);
    expect(u.position.y).toEqual(position.y);
    expect(u.arrowQuantity).toEqual(arrowQuantity);
  });

  it("shoots properly", () => {
    const position = { x: 1, y: 1 };
    const arrowQuantity = 5;
    const u = new User(position, arrowQuantity);
    expect(u.arrowQuantity).toEqual(arrowQuantity);
    u.shoot();
    expect(u.arrowQuantity).toEqual(arrowQuantity - 1);
  });

  it("refuse to shoot if arrow quantity to low", () => {
    const position = { x: 1, y: 1 };
    const arrowQuantity = 0;
    const u = new User(position, arrowQuantity);
    expect(() => u.shoot()).toThrow(UserError.ARROW_QUANTITY_TOO_LOW);
  });
});
