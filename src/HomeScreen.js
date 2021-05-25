import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { DisplayConfig, GlobalAppStates } from './storage/Constants';
import CenteredButton from './reusable/CenteredButton';
import { setData, getData } from './storage/NonVolitale';
import { Settings } from './storage/Constants';

const background_image = require('../assets/disc_golf_basket.jpg')

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        // set state variables
        this.state = {
            firstRun: false,
        }
    }

    componentDidMount() {
        getData(Settings.firstStart.id, (val) => {
            if (val === null) {
                setDefaultSettings();
            }
            else if (val === true) {
                this.setState({ firstRun: true });
            }
            else {
                setData(Settings.firstStart.id, "false");
            }
        });
    }

    render() {
        var overlay = <View />;
        if (this.state.firstRun === true) {
            // TODO ask for personalized ads
            var overlay = <Text>OVERLAY</Text>;
        }

        return (
            <View style={styles.fill}>
                {overlay}
                <Image source={background_image} style={styles.backgroundImage} />
                <View style={styles.center}>
                    <Text style={styles.textCenter}>Disc Golf Shuffle</Text>
                    <CenteredButton
                        action={() => { this.props.navigation.navigate(GlobalAppStates.shuffle) }}
                        label="Shuffle Mode" />
                    <View style={{ height: 20 }} />
                    <CenteredButton
                        action={() => { this.props.navigation.navigate(GlobalAppStates.roulette) }}
                        label="Roulette Mode" />
                    <View style={{ height: 20 }} />
                    <CenteredButton
                        action={() => { this.props.navigation.navigate(GlobalAppStates.settings) }}
                        label="Settings" />
                </View>
            </View>
        );
    }
}

async function setDefaultSettings() {
    Object.keys(Settings).forEach((key, _) => {
        // don't bother checking if they exist. Just set to default.
        let id = Settings[key].id;
        let val = String(Settings[key].default);
        setData(id, val);
    });
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
        fontSize: 30 * DisplayConfig.textScale,
    },
});

export default HomeScreen;