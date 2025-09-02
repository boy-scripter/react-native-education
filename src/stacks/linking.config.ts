
import { RootStackParamList } from '@/types/navigation';
import { LinkingOptions } from '@react-navigation/native';

const linking : LinkingOptions<RootStackParamList> = {
    prefixes: ['https://edugo.com', 'edugo-app://home'],
    config : {
        screens : ''
    },
};