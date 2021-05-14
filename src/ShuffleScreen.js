import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ShuffleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.center}>
                <Text style={{ textAlign: 'center' }}>Shuffle!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ShuffleScreen;