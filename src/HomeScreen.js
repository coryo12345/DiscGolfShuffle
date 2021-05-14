import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalAppStates } from './Constants';

const background_image = require('../assets/disc_golf_basket.jpg')

class HomeScreen extends Component {
    constructor() {
        super();
        // set state variables
        this.state = {}
        // set constants
        this.constants = { buttonOpacity: 0.93 }
    }

    render() {
        return (
            <View style={styles.fill}>
                <Image source={background_image} style={styles.backgroundImage} />
                <View style={styles.center}>
                    <Text style={styles.textCenter}>Disc Golf Shuffle</Text>
                    <TouchableOpacity 
                        activeOpacity={this.constants.buttonOpacity}
                        style={styles.buttonCenter} >
                        <Text>Shuffle Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={this.constants.buttonOpacity} 
                        style={styles.buttonCenter} 
                        onPress={() => {this.props.update_mode(GlobalAppStates[1])}} >
                        <Text>Roulette Mode</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        // left: '-50%',
        bottom: 0,
        // right: '50%',
        opacity: 0.3
    },
    fill: {
        flex: 1,
        width: '100%',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    buttonCenter: {
        flexDirection: 'row',
        height: 50,
        width: '60%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        elevation: 3,
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 30,
    },
});

export default HomeScreen;