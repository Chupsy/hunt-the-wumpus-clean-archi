import { box, Widgets } from "blessed";

export class HintDisplay {
  private hintsBox: Widgets.BoxElement;
  constructor(private screen: Widgets.Screen) {
    this.hintsBox = box({
      border: {
        type: "line",
      },
      height: "45%",
      left: "15%",
      tags: true,
      top: "top",
      width: "25%",
    });
    this.screen.append(this.hintsBox);
  }

  public update(hintsContent: string[]) {
    let content = "";
    for (const hint of hintsContent) {
      content += `{center}${hint}{/center}\n`;
    }
    this.hintsBox.setContent(content);
    this.screen.render();
  }
}
