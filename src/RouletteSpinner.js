import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const updateDelay = 0.1;
const imagesPerTile = 5; // first has x, second 2x, third 3x

const images = [
    require('../assets/spin_disc.png')
]

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image1: [],
            image2: [],
            image3: [],
        }
    }

    componentDidMount() {
        // generate image states
        let st = {
            image1: [],
            image2: [],
            image3: []
        }
        const numImages = images.length;
        // image 1, 2, 3
        for (let i = 0; i < imagesPerTile; i++) {
            st.image1.push(Math.floor(numImages * Math.random()));
            st.image2.push(Math.floor(numImages * Math.random()));
            st.image3.push(Math.floor(numImages * Math.random()));
        }
        // image 2, 3
        for (let i = 0; i < imagesPerTile; i++) {
            st.image2.push(Math.floor(numImages * Math.random()));
            st.image3.push(Math.floor(numImages * Math.random()));
        }
        // image 3
        for (let i = 0; i < imagesPerTile; i++) {
            st.image3.push(Math.floor(numImages * Math.random()));
        }

        this.setState(st);
    }

    render() {
        return (
            <View style={styles.background} >
                <View style={styles.row} >
                    <SpinItem image={images[this.state.image1[0]]} />
                    <SpinItem image={images[this.state.image2[0]]} />
                    <SpinItem image={images[this.state.image3[0]]} />
                </View>
            </View>
        );
    }
}

const SpinItem = (props) => {
    return (
        <View style={styles.spintile}>
            <Image source={props.image} style={styles.image} />
            {/* <Text>{props.image}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        elevation: 3,
        marginTop: 20,
        borderRadius: 6,
        // borderColor: '#000',
        // borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    spintile: {
        flex: 1,
        borderColor: '#333',
        borderWidth: 1,
        margin: 10,
        minHeight: 100,
        padding: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default Spinner;