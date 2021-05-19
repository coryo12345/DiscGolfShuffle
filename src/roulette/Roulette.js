import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { GlobalAppStates, DisplayConfig } from '../storage/Constants';
import { RouletteDefaultConfig } from '../storage/Volitale';
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
    var angle_str = randomRollStringPart(options, 'angle');
    // get stability
    var stable_str = randomRollStringPart(options, 'stability');
    // get speed
    var speed_str = randomRollStringPart(options, 'speed');
    // get arm
    var arm_str = randomRollStringPart(options, 'arm');
    // get throwing style/direction
    var dir_str = randomRollStringPart(options, 'direction');

    // check if all empty
    if (angle_str==="" && stable_str==="" && speed_str==="" && arm_str==="" && dir_str==="")
        return "Wildcard! Players' Choice."
    
    // format output
    var style_part = "";
    var angle_part = "";
    var disc_part = "";
    // throwing style prefix: 'lhbh' or 'rhfh'
    if (arm_str!=="" || dir_str!=="")
        var style_part = ` a ${arm_str} ${dir_str}`.trimEnd();
    // release angle
    if (angle_str!=="")
        var angle_part = ` on a ${angle_str} release angle`.trimEnd();
    // disc type
    if (stable_str!=="" || speed_str!=="")
        var disc_part = `, with a(n) ${stable_str} ${speed_str}`.trimEnd();
    
    return `Throw${style_part}${angle_part}${disc_part}`.trim();
}

/**
 * helper function for randomRollString
 * @param {object} options 
 * @param {String} category 
 * @returns {String}
 */
function randomRollStringPart(options, category) {
    var keys = Object.keys(options[category]);
    for (let i = keys.length-1; i >= 0; i--) {
        if (options[category][keys[i]] === false) {
            keys.splice(i, 1);
        }
    }
    if (keys.length == 0)
        var str = "";
    else
        var str = keys[keys.length * Math.random() << 0]
    return str;
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