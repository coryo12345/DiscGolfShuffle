import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CenteredButton from '../reusable/CenteredButton';
import { DisplayConfig } from '../storage/Constants';

class ShuffleSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            players: ["", ""] // start with 2 because it requires 2 players.
        };
    }

    updateName = (index, val) => {
        this.state.players[index] = val;
        this.setState({});
    }

    removeName = (index) => {
        this.state.players.splice(index, 1);
        this.setState({});
    }

    addName = () => {
        this.state.players.push("");
        this.setState({});
    }

    submit = () => {
        var pl = [];
        this.state.players.forEach((val, _) => {
            if (val.trim() !== "")
                pl.push(val);
        });
        if (pl.length < 2)
            this.setState({ showError: true });
        else
            this.props.startGame(pl);
    }

    render() {
        const inputs = [];
        for (let i = 0; i < this.state.players.length; i++) {
            let removable = i < 2 ? false : true;
            inputs.push(
                <NameLine key={i} index={i} updateName={this.updateName} removable={removable} removeName={this.removeName} />
            );
        }

        var err = (<View />);
        if (this.state.showError)
            var err = (
                <Text style={{ fontSize: 18 * DisplayConfig.textScale, color: '#d00', textAlign: 'center', marginTop: 10 }}>Shuffle Requires at Least 2 Groups</Text>
            );

        return (
            <SafeAreaView style={{ backgroundColor: DisplayConfig.backgroundColor, ...styles.container }}>
                {err}
                <Text style={{ ...styles.rowItem, ...styles.center, fontSize: 20 * DisplayConfig.textScale }}>Enter Players:</Text>
                <ScrollView>
                    {inputs}
                    <TouchableOpacity
                        style={{ width: 50, height: 50, margin: 5, borderRadius: 25, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#0d0', position: 'relative' }}
                        onPress={() => { this.addName() }} >
                        <View style={{ ...styles.plus, width: '60%', height: '12%', top: '44%', left: '20%' }} />
                        <View style={{ ...styles.plus, width: '12%', height: '60%', top: '20%', left: '44%' }} />
                    </TouchableOpacity>
                </ScrollView>
                <CenteredButton
                    style={{ marginBottom: 20 }}
                    action={this.submit}
                    label="Start Game" />
            </SafeAreaView>
        );
    }
}

function NameLine(props) {
    var index = props.index;
    var updateName = props.updateName;
    var removeName = props.removeName;
    var removable = props.removable;
    const [name, chName] = React.useState("");

    var changeName = (val) => {
        chName(val);
        updateName(index, val);
    }

    if (removable) {
        var removeBtn = (
            <TouchableOpacity
                style={{ width: 20, height: 20, margin: 5, borderRadius: 10, backgroundColor: '#d00' }}
                onPress={() => { removeName(index) }} >
                <View style={{ width: '60%', height: '14%', backgroundColor: '#eee', marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
            </TouchableOpacity>
        );
    }
    else {
        var removeBtn = <View />;
    }

    return (
        <View style={{ width: '94%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, flexDirection: 'row' }}>
            <TextInput
                style={{ backgroundColor: '#fff', fontSize: 20 * DisplayConfig.textScale, height: 34, flex: 1, borderColor: '#555', borderWidth: 1, borderRadius: 4, padding: 6 }}
                onChangeText={changeName}
                placeholder="Enter Player/Team Name"
                value={name} />
            {removeBtn}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    rowItem: {
        margin: 10,
        width: '100%',
    },
    center: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        backgroundColor: '#eee',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
    }
});

export default ShuffleSetup;