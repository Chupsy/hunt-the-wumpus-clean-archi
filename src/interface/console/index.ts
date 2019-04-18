import { CommandManager } from "./command_manager/command_manager";
import { GameManager } from "./game_manager/game_manager";
import { Translator } from "./translator/translator";

const translator = new Translator("FR");
const gameManager = new GameManager(
  {
    batCount: 0,
    height: 5,
    pitCount: 0,
    width: 5,
    lostArrowCount: 25,
  },
  5,
  translator,
);

const commandManager = new CommandManager(gameManager, translator);
