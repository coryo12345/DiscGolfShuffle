import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import Roulette from './src/roulette/Roulette';
import ShuffleScreen from './src/ShuffleScreen';
import { GlobalAppStates, DisplayConfig } from './src/Constants';
import RouletteOptions from './src/roulette/RouletteOptions';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                            name={GlobalAppStates.rouletteOptions}
                            component={RouletteOptions} />
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
        height: 30,
        width: '100%',
    },
});

export default App;