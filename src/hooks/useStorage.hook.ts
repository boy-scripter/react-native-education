import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const useStorage = () => {
    const setItem = <T>(key: string, value: T): T => {
        storage.set(key, JSON.stringify(value));
        return value
    };

    const getItem = <T>(key: string): T | null => {
        const value = storage.getString(key);
        return value ? (JSON.parse(value) as T) : null;
    };

    const removeItem = (key: string) => {
        storage.delete(key);
    };

    return {
        setItem,
        getItem,
        removeItem,
    };
};