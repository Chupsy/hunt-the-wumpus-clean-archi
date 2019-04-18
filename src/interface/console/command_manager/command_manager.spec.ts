import { GameManager } from "../game_manager/game_manager";
import { CommandManager } from "./command_manager";
import { Translator } from "../translator/translator";

describe("commandManager", () => {
  it("adds all the commands on init", () => {
    let translator = new Translator("FR");
    let commandsAdded = {};
    let gameManager = {
      addCommand: jest.fn().mockImplementation((name, fn) => {
        commandsAdded[name[0]] = fn;
      }),
      addCommandDisplay: jest.fn(),
      restart: jest.fn(),
      shoot: jest.fn(),
      move: jest.fn()
    };
    let commandManager = new CommandManager(
      // @ts-ignore
      gameManager as GameManager,
      translator
    );
    // @ts-ignore
    process.exit = jest.fn();
    expect(gameManager.addCommand).toHaveBeenCalledTimes(10);

    commandsAdded["r"]();
    expect(gameManager.restart).toHaveBeenCalledTimes(1);
    commandsAdded["escape"]();
    expect(process.exit).toHaveBeenCalledTimes(1);
    commandsAdded["q"]();
    expect(gameManager.move).toHaveBeenCalledTimes(1);
    commandsAdded["k"]();
    expect(gameManager.shoot).toHaveBeenCalledTimes(1);
  });
});
