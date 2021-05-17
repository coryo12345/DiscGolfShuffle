import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { GlobalAppStates, DisplayConfig, RouletteDefaultConfig } from '../Constants';
import CenteredButton from '../reusable/CenteredButton';
import Spinner from './RouletteSpinner';
import { ScrollView } from 'react-native-gesture-handler';

const settingsIcon = require('../../assets/REPLACE_settings_icon.png');

class Roulette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputRoll: "Press Spin! to make your first roll",
            spinState: 0 // 0: no spin 1: requested spin
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{height: 30, width: 30, marginRight: 10}}
                    activeOpacity={DisplayConfig.buttonOpacity}
                    onPress={() => { this.props.navigation.navigate(GlobalAppStates.rouletteOptions) }} >
                    <Image style={{width: '100%', height: '100%'}} source={settingsIcon} />
                </TouchableOpacity>
            ),
        });
    }

    startSpin = () => {
        if (this.state.spinState == 0) {
            this.setState({ spinState: 1 });
        }
    }

    startSpinAck = () => {
        if (this.state.spinState == 1) {
            this.setState({ spinState: 2 });
        }
    }

    endSpin = () => {
        let roll_str = randomRollString();
        this.setState({ spinState: 0, outputRoll: roll_str });
    }

    render() {
        return (
            <ScrollView style={styles.center}>
                <View style={styles.partition}>
                    <Spinner spinState={this.state.spinState} endSpin={this.endSpin} ack={this.startSpinAck} />
                </View>
                <View style={styles.partition}>
                    <CenteredButton
                        action={this.startSpin}
                        label="Spin!" />
                </View>
                <View style={styles.partition}>
                    <View style={styles.textBackground}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.outputRoll}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function randomRollString() {
    let options = RouletteDefaultConfig;
    // get angle
    var keys = Object.keys(options.angle);
    for (let i = keys.length-1; i >= 0; i--) {
        if (options.angle[keys[i]] === false) {
            keys.splice(i, 1);
        }
    }
    if (keys.length == 0)
        var angle_str = "";
    else
        var angle_str = keys[keys.length * Math.random() << 0] + " release, "
    // get stability
    var keys = Object.keys(options.stability);
    for (let i = keys.length-1; i >= 0; i--) {
        if (options.stability[keys[i]] === false) {
            keys.splice(i, 1);
        }
    }
    if (keys.length == 0)
        var stable_str = "";
    else
        var stable_str = keys[keys.length * Math.random() << 0]
    // get speed
    var keys = Object.keys(options.speed);
    for (let i = keys.length-1; i >= 0; i--) {
        if (options.speed[keys[i]] === false) {
            keys.splice(i, 1);
        }
    }
    if (keys.length == 0)
        var speed_str = "";
    else
        var speed_str = keys[keys.length * Math.random() << 0]
    
    if (angle_str==="" && stable_str==="" && speed_str==="")
        return "Wildcard! Player's Choice."
    
    return `${angle_str} ${stable_str} ${speed_str}`;
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        width: '100%',
    },
    anchorTop: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    anchorBottom: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    partition: {
        flex: 1,
        marginBottom: 20,
    },
    textBackground: {
        width: '90%',
        height: 140,
        backgroundColor: '#DDD',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
        lineHeight: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Roulette;