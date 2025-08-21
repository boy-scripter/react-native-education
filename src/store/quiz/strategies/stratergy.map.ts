import { GameModeType } from "@/graphql/generated";
import { GameModeStrategy } from "@/types/quiz";

export const GameStrategyMap: Record<
    GameModeType,
    {
        strategy: GameModeStrategy;
        components: React.FC<any>[];
    }
> = {
    //   [GameModeType.Single]: {
    //     strategy: new SinglePlayerStrategy(),
    //     components: [Scoreboard],
    //   },
    //   [GameModeType.Multi]: {
    //     strategy: new MultiPlayerStrategy(),
    //     components: [Scoreboard, Timer],
    //   },
    //   [GameModeType.Timed]: {
    //     strategy: new SinglePlayerStrategy(),
    //     components: [Scoreboard, Timer, Hint],
    //   },
};