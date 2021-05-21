import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { DisplayConfig, Twists } from '../storage/Constants';
import { setShuffleTwist, ShuffleTwist } from '../storage/Volitale';

class ShuffleGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            currentTwist: ShuffleTwist,
            twists: []
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

        return cards;
    }

    render() {
        if (this.state.currentTwist === "") {
            if (this.state.twists.length === 0) {
                let t = this.randomTwists();
                this.state.twists = t;
                var cards = t;
            }
            else {
                var cards = this.state.twists;
            }
        }
        else {
            var cards = this.state.currentTwist;
        }

        // TODO pick a random player to choose
        // TODO format display!!!!
        return (
            <SafeAreaView style={{ height: '100%', width: '100%' }}>
                {cards}
            </SafeAreaView>
        );
    }
}

function TwistCard(props) {
    var str = props.text;

    var c = (<View />);

    if (props.choosable) {
        var c = (
            <TouchableOpacity style={{ height: 30, width: '50%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: DisplayConfig.main, }} onPress={props.onChoose} >
                <Text style={{ height: 24 }}>Choose</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <Text style={{ height: 30, lineHeight: 30, width: '100%' }}>{str}</Text>
            {c}
        </View>
    );

}

const styles = StyleSheet.create({

});

export default ShuffleGame;