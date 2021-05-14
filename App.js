import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import Roulette from './src/Roulette';
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

    update_app_mode = (app_state_str) => {
        GlobalAppStates.forEach( (val, i) => {
            if (app_state_str === val)
                this.setState({appState: app_state_str});
        });
    }

    render() {
        const android_status_padding = this.state.android_status_padding ? <View style={styles.statusPadding}></View> : <div></div>;
        let app_screen_component;
        switch (this.state.appState) {
            case GlobalAppStates[0]: // main menu
                app_screen_component = <HomeScreen update_mode={this.update_app_mode} />
                break;
            case GlobalAppStates[1]: // roulette
                app_screen_component = <Roulette update_mode={this.update_app_mode} />
                break;
            default:
                app_screen_component = <HomeScreen update_mode={this.update_app_mode} />
                break;
        }
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                {android_status_padding}
                {app_screen_component}
            </SafeAreaView>
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