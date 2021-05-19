import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { GlobalAppStates } from './storage/Constants';
import CenteredButton from './reusable/CenteredButton';

const background_image = require('../assets/disc_golf_basket.jpg')

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        // set state variables
        this.state = {}
    }

    render() {
        return (
            <View style={styles.fill}>
                <Image source={background_image} style={styles.backgroundImage} />
                <View style={styles.center}>
                    <Text style={styles.textCenter}>Disc Golf Shuffle</Text>
                    <CenteredButton 
                        action={()=>{this.props.navigation.navigate(GlobalAppStates.shuffle)}}
                        label="Shuffle Mode" />
                    <View style={{ height: 20 }} />
                    <CenteredButton 
                        action={()=>{this.props.navigation.navigate(GlobalAppStates.roulette)}}
                        label="Roulette Mode" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        height: '100%',
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
    textCenter: {
        textAlign: 'center',
        fontSize: 30,
    },
});

export default HomeScreen;