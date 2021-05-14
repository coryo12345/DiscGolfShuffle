import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalAppStates } from './Constants';
import CenteredButton from './reusable/CenteredButton';
import Spinner from './RouletteSpinner';
import { ScrollView } from 'react-native-gesture-handler';

class Roulette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputRoll: "Press Spin! to make your first roll"
        }
    }

    render() {
        return (
            <ScrollView style={styles.center}>
                <View style={styles.partition}>
                    <Spinner />
                </View>
                <View style={styles.partition}>
                    <CenteredButton
                        action={() => { }}
                        label="Spin!" />
                </View>
                <View style={styles.partition}>
                    <View style={styles.textBackground}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.outputRoll}</Text>
                    </View>
                </View>
                <View style={styles.partition}>
                    <CenteredButton
                        action={() => { console.log("test") }}
                        label="Manage Roll Options" />
                </View>
            </ScrollView>
        );
    }
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
        height: '100%',
        backgroundColor: '#DDD',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
    },
});

export default Roulette;