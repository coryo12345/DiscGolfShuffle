import AsyncStorage from "@react-native-async-storage/async-storage";

export function setData(key, value) {
    console.log("setData ", key, value);
    try {
        AsyncStorage.setItem(key, String(value), (err) => {
        });
    } 
    catch (e) {
        // saving error
    }
}

export function getData(key, callback) {
    try {
        AsyncStorage.getItem(key, (err, res) => {
            if (!err) {
                callback(res);
            }
            else {
                callback(null);
            }
        })
    } 
    catch (e) {
        // saving error
    }
}
