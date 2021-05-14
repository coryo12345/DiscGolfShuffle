import React, { Component, version } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { GlobalAppStates } from './Constants';

class Roulette extends Component {
    constructor() {
        super();
        this.state = {}
    }

    backAction = () => {
        this.props.update_mode(GlobalAppStates[0]);
    }

    // back handler to main menu
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={styles.fill}>
            <View style={styles.center}>
                <TouchableOpacity 
                    activeOpacity={0.93} 
                    style={styles.buttonCenter}
                    onPress={this.backAction} >
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text>Roullete</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        width: '100%',
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
});

export default Roulette;