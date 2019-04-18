import { GameStatus } from "../../../../constants/game_status";

export let GAME_STATUS = {};
GAME_STATUS[GameStatus.IN_PROGRESS] = {
  EN: "In progress",
  FR: "En cours",
};
GAME_STATUS[GameStatus.LOST] = {
  EN: "Lost",
  FR: "Perdu",
};
GAME_STATUS[GameStatus.WON] = {
  EN: "Won",
  FR: "Gagné",
};
