import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native-gesture-handler';
import RouletteOptions from './roulette/RouletteOptions';
import { DisplayConfig, Settings } from './storage/Constants';
import { getData, setData } from './storage/NonVolitale';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {},
        };
    }

    componentDidMount() {
        // load in settings from storage
        Object.keys(Settings).forEach((key, _) => {
            getData(Settings[key].id, (val) => {
                this.state.settings[key] = (val == "true");
                this.setState({});
            });
        });
    }

    saveChange = (key, val) => {
        this.state.settings[key] = val;
        this.setState({});
        setData(Settings[key].id, String(val));
    }

    Toggle = (key, idx) => {
        return (
            <View key={idx} style={{ width: '100%', flexDirection: 'row' }}>
                <CheckBox
                    style={{ flex: 1 }}
                    onClick={() => { this.saveChange(key, !this.state.settings[key]) }}
                    isChecked={this.state.settings[key]}
                    rightText={Settings[key].text} />
            </View>
        );
    }

    render() {
        var settingList = [];
        // convert settings datatypes to components
        Object.keys(this.state.settings).forEach((key, idx) => {
            if (Settings[key].display !== true) return;
            if (Settings[key].type == 'checkbox') {
                settingList.push(
                    this.Toggle(key, idx)
                );
            }
            else if (Settings[key].type == 'slider') {
                settingList.push(
                    <View />
                );
            }
        });

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>App Settings</Text>
                {settingList}
                <Text style={styles.header}>Roulette Settings</Text>
                <RouletteOptions style={{marginBottom: 30}} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 24 * DisplayConfig.textScale,
        textAlign: 'center',
        width: '100%',
        marginTop: 15,
    }
});

export default SettingsScreen;