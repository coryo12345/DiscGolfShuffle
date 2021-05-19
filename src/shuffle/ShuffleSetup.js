import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import CenteredButton from '../reusable/CenteredButton';

class ShuffleSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        // TODO require at least 2 groups.
        this.props.startGame(this.state.players);
    }

    render() {
        const inputs = [];
        for (let i = 0; i < this.state.players.length; i++) {
            inputs.push(
                <NameLine key={i} index={i} updateName={this.updateName} removeName={this.removeName} />
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ ...styles.rowItem, ...styles.center, fontSize: 20 }}>Enter Players:</Text>
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
    index = props.index;
    updateName = props.updateName;
    removeName = props.removeName;
    const [name, chName] = React.useState("");

    var changeName = (val) => {
        chName(val);
        updateName(index, val);
    }

    return (
        <View style={{ width: '94%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, flexDirection: 'row' }}>
            <TextInput
                style={{ fontSize: 20, height: 30, flex: 1, borderColor: '#555', borderWidth: 1, borderRadius: 4, padding: 4 }}
                onChangeText={changeName}
                placeholder="Enter Player/Team Name"
                value={name} />
            <TouchableOpacity
                style={{ width: 20, height: 20, margin: 5, borderRadius: 10, backgroundColor: '#d00' }}
                onPress={() => { removeName(index) }} >
                <View style={{ width: '60%', height: '14%', backgroundColor: '#eee', marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
            </TouchableOpacity>
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
        // top: '20%',
        // left: '20%',
    }
});

export default ShuffleSetup;