import AsyncStorage from "@react-native-community/async-storage"



export const storeBookmarkedUsers = async (item) => {
    try {
        await AsyncStorage.setItem('BOOKMARKED',JSON.stringify(item))
        return true
    } catch (error) {
        throw error
    }
}


export const getBookmarkedUsers = async () => {
    try {
        const value = await AsyncStorage.getItem('BOOKMARKED')
        return value;
    } catch (error) {
        throw error
    }
}