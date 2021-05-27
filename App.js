import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import Roulette from './src/roulette/Roulette';
import ShuffleScreen from './src/shuffle/ShuffleScreen';
import { GlobalAppStates } from './src/storage/Constants';
import RouletteOptions from './src/roulette/RouletteOptions';
import Ad from './src/Ad';
import SettingsScreen from './src/SettingsScreen';

const Stack = createStackNavigator();

class App extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
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
                    <Stack.Screen
                        name={GlobalAppStates.settings}
                        component={SettingsScreen} />
                </Stack.Navigator>
                <Ad />
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
        height: 30,
        width: '100%',
    },
});

export default App;