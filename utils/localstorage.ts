import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (value: any, key: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        } else {
            return null;
        }
    } catch (e) {
        // error reading value
    }
}
export { getData, storeData }