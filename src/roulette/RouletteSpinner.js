import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const updateDelay = 0.07;
const imagesPerTile = 9; // first has x, second 2x, third 3x

const images = [
    require('../../assets/spin_disc.png'),
    require('../../assets/spin_basket.png'),
    require('../../assets/spin_flag.png'),
    require('../../assets/spin_unknown.png')
]

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinCount: 0,
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
            image3: [],
            spinCount: 0
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

        st.spinCount = st.image3.length-1;

        this.setState(st);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.spinState == 1) {
            // rotate arrays by 1 so it appears to change
            this.state.image1.push(this.state.image1.shift());
            this.state.image2.push(this.state.image2.shift());
            this.state.image3.push(this.state.image3.shift());
            // react processing
            this.props.ack();
            this.state.spinCount = 0;
        }
        if (this.props.spinState == 2) {
            setTimeout(this.spinTick, updateDelay*1000);
        }
    }

    spinTick = () => {
        if (this.state.spinCount < (imagesPerTile*3)-1) {
            this.setState({spinCount: this.state.spinCount+1})
        }
        else {
            this.props.endSpin();
        }
    }

    render() {
        return (
            <View style={styles.background} >
                <View style={styles.row} >
                    <SpinItem image={images[this.state.image1[Math.min(this.state.spinCount, this.state.image1.length-1)]]} />
                    <SpinItem image={images[this.state.image2[Math.min(this.state.spinCount, this.state.image2.length-1)]]} />
                    <SpinItem image={images[this.state.image3[Math.min(this.state.spinCount, this.state.image3.length-1)]]} />
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