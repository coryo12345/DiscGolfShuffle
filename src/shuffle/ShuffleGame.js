import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CenteredButton from '../reusable/CenteredButton';
import { DisplayConfig, Twists } from '../storage/Constants';
import { setShuffleTwist, ShuffleTwist } from '../storage/Volitale';

class ShuffleGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            currentTwist: ShuffleTwist,
            twists: [],
            playerChoose: "",
        };
    }

    chosenTwist = (str) => {
        var t = <TwistCard text={str} choosable={false} />
        this.setState({ currentTwist: t, twists: [] });
        setShuffleTwist(t);
    }

    randomTwists = () => {
        // how many cards to generate
        var numGenerate = ((2 * Math.random()) << 0) + 2;

        // shuffle list
        var tw = Twists;
        for (let i = tw.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tw[i], tw[j]] = [tw[j], tw[i]];
        }

        // format cards 
        var cards = [];

        for (let i = 0; i < numGenerate; i++) {
            let s = "";
            // shuffle players
            let p = this.state.players;
            for (let r = p.length - 1; r > 0; r--) {
                const j = Math.floor(Math.random() * (r + 1));
                [p[r], p[j]] = [p[j], p[r]];
            }

            tw[i].forEach(str => {
                let idx = str.indexOf('$player');
                if (idx >= 0) {
                    // replace string
                    let num = Number(str[idx + '$player'.length]) - 1;
                    s += p[num] + ' ';
                }
                else {
                    s += str + ' ';
                }
            });
            cards.push(
                <TwistCard key={i} text={s.trim()} choosable={true} onChoose={() => { this.chosenTwist(s.trim()) }} />
            );
        }

        // pick a random player
        let p = this.state.players[this.state.players.length * Math.random() << 0];

        this.state.twists = cards;
        this.state.playerChoose = p;
    }

    nextHole = () => {
        this.setState({
            currentTwist: "",
            twists: [],
        });
        setShuffleTwist("");
    }

    render() {
        if (this.state.currentTwist === "") {
            if (this.state.twists.length === 0) {
                this.randomTwists();
            }
            var cards = this.state.twists;
            var plChs = <Text style={styles.titleText}>{this.state.playerChoose} Must Choose One:</Text>
            var nextBtn = <View />
        }
        else {
            var cards = this.state.currentTwist;
            var plChs = <Text style={styles.titleText}>Current Twist</Text>
            var nextBtn = <CenteredButton action={this.nextHole} label="Next Hole" />
        }

        return (
            <View style={styles.container}>
                {plChs}
                <ScrollView style={styles.container}>
                    {cards}
                </ScrollView>
                {nextBtn}
            </View>
        );
    }
}

function TwistCard(props) {
    var str = props.text;

    var c = (<View />);

    if (props.choosable) {
        var c = (
            <TouchableOpacity style={styles.chooseButton} onPress={props.onChoose} >
                <Text style={{ flex: 1, width: '100%', textAlign: 'center', color: '#fff', fontSize: 21 }}>Choose</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={{ flex: 1, fontSize: 19, textAlign: 'center' }}>{str}</Text>
            {c}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: DisplayConfig.backgroundColor,
        height: '100%',
        width: '100%',
        paddingBottom: 10
    },
    card: {
        backgroundColor: '#fff',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        borderRadius: 3,
        elevation: 3,
        padding: 15,
    },
    chooseButton: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: DisplayConfig.main,
        textAlign: 'center',
        marginTop: 10,
        borderRadius: 3,
        padding: 5,
    },
    titleText: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20
    }
});

export default ShuffleGame;