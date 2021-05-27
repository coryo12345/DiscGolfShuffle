import { AdMobBanner } from 'expo-ads-admob';
import React, { Component } from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { Settings } from './storage/Constants';
import { getData } from './storage/NonVolitale';

// const AD_UNIT_ID = "ca-app-pub-3940256099942544/2934735716" // ios-test
// const AD_UNIT_ID = "ca-app-pub-3940256099942544/6300978111" // android-test
// const AD_UNIT_ID = "ca-app-pub-6094925353807017/1586671303" // android 
// const AD_UNIT_ID = "ca-app-pub-6094925353807017/3633222470" // ios

const AD_UNITS = {
    android: "ca-app-pub-6094925353807017/1586671303",
    ios: "ca-app-pub-6094925353807017/3633222470",
}

const AD_UNIT_ID = Platform.OS === "ios" ? AD_UNITS.ios : AD_UNITS.android;

class Ad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            personal: false,
        };
    }

    componentDidMount() {
        getData(Settings.personalizedAds.id, (val) => {
            this.setState({ personal: val });
        });
    }

    onAdError = () => {
        // on app restart it'll try again
        this.setState({ show: false });
    }

    render() {
        if (this.state.show === true) {
            return (
                <SafeAreaView style={{ width: '100%', }}>
                    <AdMobBanner
                        style={{ wdith: '100%', }}
                        bannerSize="smartBannerPortrait"
                        adUnitID={AD_UNIT_ID}
                        servePersonalizedAds={this.state.personal}
                        onDidFailToReceiveAdWithError={this.onAdError}
                    />
                </SafeAreaView>
            );
        }
        return (<View />);
    }
}

export default Ad;