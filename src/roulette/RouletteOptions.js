import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { RouletteDefaultConfig, GlobalAppStates, DisplayConfig } from '../Constants';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';

class RouletteOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: RouletteDefaultConfig
        };
    }

    saveChange = (category, option, val) => {
        this.state.config[category][option] = val;
        RouletteDefaultConfig[category][option] = val;
        this.setState({});
    }


    Toggle(category, option) {
        if (Platform.OS === 'android')
            var checkbox = (<CheckBox
                disabled={false}
                value={this.state.config[category][option]}
                onValueChange={(newValue) => { this.saveChange(category, option, newValue) }}
                tintColors={{ true: 'royalblue' }} />
            );
        else if (Platform.OS === 'ios')
            var checkbox = (<CheckBox
                disabled={false}
                value={this.state.config[category][option]}
                onValueChange={(newValue) => { this.saveChange(category, option, newValue) }}
                onFillColor={'royalblue'} />
            );
        return (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                {checkbox}
                <Text style={{ width: '100%', height: '100%', textAlignVertical: 'center' }}>{option}</Text>
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
        // fontWeight: 'bold',
        fontSize: 18
    },
});

export default RouletteOptions;