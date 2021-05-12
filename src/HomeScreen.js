import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const background_image = require('../assets/disc_golf_basket.jpg')

class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.fill}>
                <Image source={background_image} style={styles.backgroundImage} />
                <Text>Hello!</Text>
                <Button title="Start"></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
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
    }
  });

export default HomeScreen;