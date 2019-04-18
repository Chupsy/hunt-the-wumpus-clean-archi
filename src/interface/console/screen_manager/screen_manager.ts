import * as blessed from "blessed";
import { CommandDisplay } from "./command_display";
import { HintDisplay } from "./hint_display";
import { MapDisplay } from "./map_display";
export class ScreenManager {
  public hintDisplay: HintDisplay;
  public commandDisplay: CommandDisplay;
  public mapDisplay: MapDisplay;
  private screen: blessed.Widgets.Screen;

  constructor(width: number, height: number) {
    this.screen = blessed.screen({
      smartCSR: true,
    });
    this.hintDisplay = new HintDisplay(this.screen);
    this.mapDisplay = new MapDisplay(width, height, this.screen);
    this.commandDisplay = new CommandDisplay(this.screen);
    this.screen.render();
  }

  public addCommand(commandInfos: string[], execute: any) {
    this.screen.key(commandInfos, execute);
  }
}
