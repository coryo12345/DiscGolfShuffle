import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View } from 'react-native';
import HomeScreen from './src/HomeScreen';

export default function App() {
    const android_status_padding = Platform.OS === 'android' ? <View style={styles.statusPadding}></View>: <div></div>;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            {android_status_padding}
            <Text>Open up App.js to start working on your app!!</Text>
            <HomeScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusPadding: {
        // flex: 1,
        height: 35,
        width: '100%',
    },
});
