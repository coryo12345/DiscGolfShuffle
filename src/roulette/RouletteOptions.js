import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { RouletteDefaultConfig } from '../storage/Volitale';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native-gesture-handler';
import { DisplayConfig } from '../storage/Constants';

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
            <ScrollView style={{...this.props.style, backgroundColor: DisplayConfig.backgroundColor, flex: 1 }}>
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
                <View style={styles.partition}>
                    <Text style={styles.bold}>Toggle Handedness</Text>
                    {this.Toggle('arm', 'Left Handed')}
                    {this.Toggle('arm', 'Right Handed')}
                </View>
                <View style={styles.partition}>
                    <Text style={styles.bold}>Toggle Throwing Style</Text>
                    {this.Toggle('direction', 'Backhand')}
                    {this.Toggle('direction', 'Forehand')}
                    {this.Toggle('direction', 'Grenade')}
                    {this.Toggle('direction', 'Tomahawk')}
                    {this.Toggle('direction', 'Thumber')}
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
        fontSize: 18 , /* * DisplayConfig.textScale, */
        marginBottom: 5,
    },
});

export default RouletteOptions;