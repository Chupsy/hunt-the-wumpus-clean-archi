import { box, Widgets } from "blessed";

export class CommandDisplay {
  private commandsBox: Widgets.BoxElement;
  constructor(private screen: Widgets.Screen) {
    this.commandsBox = box({
      border: {
        type: "line",
      },
      height: "50%",
      left: "15%",
      tags: true,
      top: "45%",
      width: "25%",
    });
    this.screen.append(this.commandsBox);
  }

  public update(infos: string[]) {
    let content = "";
    for (const info of infos) {
      content += `{center}${info}{/center}\n`;
    }
    this.commandsBox.setContent(content);
    this.screen.render();
  }
}
