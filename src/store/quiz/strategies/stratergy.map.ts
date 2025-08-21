import { GameModeType } from "@/graphql/generated";
import { GameModeStrategy } from "@/types/quiz";
import { SinglePlayerModeStrategy } from "./singleplayer.stratergy";

type ComponentDef<P = {}> = React.FC<P>;

type GameStrategyMapType = {
    [key in GameModeType]: {
        strategy: GameModeStrategy;
        components: Record<string, ComponentDef<any>>; // now an object
    };
};

export const GameStrategyMap: GameStrategyMapType = {
    [GameModeType.Single]: {
        strategy: new SinglePlayerModeStrategy(),
        components: {},
    },
};

