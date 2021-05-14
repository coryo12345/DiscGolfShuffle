import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import Roulette from './src/Roulette';
import ShuffleScreen from './src/ShuffleScreen';
import { GlobalAppStates } from './src/Constants';

const Stack = createStackNavigator();

class App extends Component {

    constructor() {
        super();
        this.state = {
            android_status_padding: Platform.OS === 'android',
            appState: GlobalAppStates[0]
        }
    }

    render() {
        // const android_status_padding = this.state.android_status_padding ? <View style={styles.statusPadding}></View> : <View></View>;
        return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={GlobalAppStates[0]}>
                        <Stack.Screen
                            name={GlobalAppStates.mainmenu}
                            component={HomeScreen}
                            options={{
                                headerShown: 0,
                            }}
                        />
                        <Stack.Screen
                            name={GlobalAppStates.roulette}
                            component={Roulette} />
                        <Stack.Screen
                            name={GlobalAppStates.shuffle}
                            component={ShuffleScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
        );
    }
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
        height: 30,
        width: '100%',
    },
});

export default App;