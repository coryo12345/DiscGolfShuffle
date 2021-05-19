import { View, Text, StyleSheet } from "react-native";
import { DisplayConfig } from "../storage/Constants";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const buttonWidth = '60%';

/**
 * 
 * === props ===
 * action: on click function
 * label: the display text for the button
 */
class CenteredButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={DisplayConfig.buttonOpacity}
                    style={styles.buttonCenter}
                    onPress={this.props.action} >
                    <Text style={styles.white}>{this.props.label}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonCenter: {
        flexDirection: 'row',
        height: 50,
        width: buttonWidth,
        backgroundColor: DisplayConfig.main,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        elevation: 3,
        borderRadius: 3,
    },
    white: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
    }
});

export default CenteredButton;