import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { DisplayConfig, GlobalAppStates } from './storage/Constants';
import CenteredButton from './reusable/CenteredButton';
import { setData, getData } from './storage/NonVolitale';
import { Settings } from './storage/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                this.setState({ firstRun: true });
            }
            else if (val === true) {
                this.setState({ firstRun: true });
            }
            else {
                setData(Settings.firstStart.id, "false");
            }
        });
    }

    confirm = (val) => {
        if (val === true)
            setData(Settings.personalizedAds.id, 'true');
        else
            setData(Settings.personalizedAds.id, 'false');
        this.setState({ firstRun: false });
    }

    render() {
        var overlay = <View />;
        if (this.state.firstRun === true) {
            var overlay = (
                // <SafeAreaView>
                    <View style={styles.overlay}>
                        <Text style={{ fontSize: 22 * DisplayConfig.textScale, textAlign: 'center', marginBottom: 10, }}>Thanks for using Disc Golf Shuffle.</Text>
                        <Text style={{ fontSize: 16 * DisplayConfig.textScale, textAlign: 'center' }}>We use banner ads at the bottom of the app to help fund this project. We give you the option to enable or disable personalized ads for this device. If you agree, the ads shown to you will more relevant to you. The choice is up to you. You can always change this later in Settings.</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                            <View style={{ maxWidth: '50%', }}>
                                <TouchableOpacity style={{ backgroundColor: DisplayConfig.main, ...styles.button }} activeOpacity={DisplayConfig.buttonOpacity} onPress={() => {this.confirm(true)}}>
                                    <Text style={{ color: '#fff', fontSize: 19 * DisplayConfig.textScale, textAlign: 'center' }}>Yes</Text>
                                    <Text style={{ color: '#fff', fontSize: 14 * DisplayConfig.textScale, textAlign: 'center' }}>Show me personalized ads</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ maxWidth: '50%', }}>
                                <TouchableOpacity style={{ backgroundColor: '#ddd', ...styles.button }} activeOpacity={DisplayConfig.buttonOpacity} onPress={() => {this.confirm(false)}}>
                                    <Text style={{ fontSize: 19 * DisplayConfig.textScale, textAlign: 'center' }}>No</Text>
                                    <Text style={{ fontSize: 14 * DisplayConfig.textScale, textAlign: 'center' }}>Show me random ads</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                // </SafeAreaView>
            );
        }

        return (
            <View style={styles.fill}>
                <Image source={background_image} style={styles.backgroundImage} />
                {overlay}
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
    overlay: {
        width: '100%',
        height: 90000,
        backgroundColor: '#fff',
        padding: 20,
        fontSize: 18 * DisplayConfig.textScale,
        paddingTop: 60,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        minHeight: 80 * DisplayConfig.textScale,
    }
});

export default HomeScreen;