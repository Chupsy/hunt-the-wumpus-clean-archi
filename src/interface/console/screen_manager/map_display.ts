import { box, Widgets } from "blessed";
import { ScreenManager } from "./screen_manager";

export class MapDisplay {
  private map: Widgets.BoxElement;
  constructor(
    private width: number,
    private height: number,
    private screen: Widgets.Screen,
  ) {
    this.map = box({
      border: {
        type: "line",
      },
      height: "85%",
      left: "left",
      tags: true,
      top: "top",
      width: "15%",
    });
    this.screen.append(this.map);
  }

  public update(
    userPosition: { x: number; y: number },
    userArrowCount: number,
    status: string,
  ) {
    let content = "";
    for (let i = 0; i < this.height; i++) {
      content += "{center}";
      for (let j = 0; j < this.width; j++) {
        if (userPosition.x === j && userPosition.y === i) {
          content += "O";
        } else {
          content += "X";
        }
        if (j < this.width - 1) {
          content += " ";
        }
      }
      content += "{/center}\n";
    }
    content += `\n{center}Arrows : ${userArrowCount}{/center}`;
    content += `\n{center}Status : ${status}{/center}`;
    this.map.setContent(content);
    this.screen.render();
  }
}
