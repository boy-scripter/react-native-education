
import { GameModeStrategy, GameModeType } from "@/types/quiz";
import { SinglePlayerModeStrategy } from "./singleplayer.stratergy";

export class GameModeFactory {
    static createGameMode(mode: GameModeType, socket: WebSocket): GameModeStrategy {
        switch (mode) {
            case GameModeType.Single:
                return new SinglePlayerModeStrategy();
            default:
                alert(`Unknown game mode: ${mode}`);
                throw new Error(`Unknown game mode: ${mode}`);
        }
    }
}