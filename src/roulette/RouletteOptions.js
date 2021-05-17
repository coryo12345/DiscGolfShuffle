import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { RouletteDefaultConfig, GlobalAppStates, DisplayConfig } from '../Constants';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native-gesture-handler';

class RouletteOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: RouletteDefaultConfig
        };
    }

    saveChange = (category, option) => {
        let val = !this.state.config[category][option];
        this.state.config[category][option] = val;
        RouletteDefaultConfig[category][option] = val;
        this.setState({});
    }


    Toggle(category, option) {
        return (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <CheckBox
                    style={{ flex: 1 }}
                    onClick={() => { this.saveChange(category, option) }}
                    isChecked={this.state.config[category][option]}
                    rightText={option} />
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.partition}>
                    <Text style={styles.bold}>Toggle Angles</Text>
                    {this.Toggle('angle', 'Hyzer')}
                    {this.Toggle('angle', 'Anhyzer')}
                    {this.Toggle('angle', 'Roller')}
                    {this.Toggle('angle', 'Flat')}
                </View>
                <View style={styles.partition}>
                    <Text style={styles.bold}>Toggle Stability</Text>
                    {this.Toggle('stability', 'Understable')}
                    {this.Toggle('stability', 'Neutral')}
                    {this.Toggle('stability', 'Overstable')}
                </View>
                <View style={styles.partition}>
                    <Text style={styles.bold}>Toggle Speeds</Text>
                    {this.Toggle('speed', 'Putter')}
                    {this.Toggle('speed', 'Midrange')}
                    {this.Toggle('speed', 'Fairway')}
                    {this.Toggle('speed', 'Driver')}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    partition: {
        flex: 1,
        width: '100%',
        margin: 10,
    },
    bold: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default RouletteOptions;