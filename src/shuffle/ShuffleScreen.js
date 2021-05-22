import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CenteredButton from '../reusable/CenteredButton';
import { DisplayConfig, ShuffleRules } from '../storage/Constants';
import { setShufflePlayers, setShuffleTwist, ShufflePlayers } from '../storage/Volitale';
import ShuffleGame from './ShuffleGame';
import ShuffleSetup from './ShuffleSetup';

const GameState = {
    none: 0,
    setup: 1,
    ingame: 2,
}

class ShuffleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: GameState.none,
            players: []
        }
    }

    componentDidMount() {
        this.setState({ players: ShufflePlayers });
    }

    startGame = (players) => {
        if (this.state.gameState === GameState.setup) {
            this.setState({ players: players, gameState: GameState.ingame });
            setShufflePlayers(players);
            setShuffleTwist("");
        }
    }

    render() {
        if (this.state.gameState === GameState.none) {
            if (this.state.players.length === 0) {
                var currentPlayers = "No Game in Progress.";
                var continueBtn = (<View />);
            }
            else {
                var currentPlayers = `There is a game in progress with ${this.state.players.length} player`
                if (this.state.players.length === 1)
                    currentPlayers += '.';
                else
                    currentPlayers += 's.';
                var continueBtn = (
                    <CenteredButton
                        action={() => { this.setState({ gameState: GameState.ingame }) }}
                        label="Continue" />
                );
            }
            var rules = [];
            for (let i = 0; i < ShuffleRules.length; i++) {
                rules.push(
                    <Text style={{ textAlign: 'center', fontSize: 18, padding: 10, }} key={i}>{ShuffleRules[i]}</Text>
                );
            }
            var screenDisplay = (
                <View style={{ backgroundColor: DisplayConfig.backgroundColor, flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 20, }}>Welcome to Shuffle!</Text>
                    <Text style={{ textAlign: 'center', }}>{currentPlayers}</Text>
                    {continueBtn}
                    <CenteredButton
                        action={() => { this.setState({ gameState: GameState.setup }) }}
                        label="Start New Game" />
                    <ScrollView style={{ height: '100%', marginBottom: 20, marginTop: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 26, marginTop: 20, padding: 10 }}>How to Play</Text>
                        {rules}
                    </ScrollView>
                </View>
            )
        }
        else if (this.state.gameState === GameState.setup) {
            var screenDisplay = (
                <View>
                    <ShuffleSetup startGame={this.startGame} />
                </View>
            );
        }
        else if (this.state.gameState === GameState.ingame) {
            var screenDisplay = (
                <View>
                    <ShuffleGame players={this.state.players} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {screenDisplay}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignContent: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});

export default ShuffleScreen;