export const GlobalAppStates = {
    mainmenu: 'Home',
    roulette: 'Roulette',
    rouletteOptions: 'Roulette Configuration',
    shuffle: 'Shuffle',
};

export const DisplayConfig = {
    main: 'royalblue',
    buttonOpacity: 0.93
};

// i know this isn't a constant.
// i change it in runtime.
// it will be moved to another file at somepoint.
// but it works for now okay.
export var RouletteDefaultConfig = {
    angle: {
        Hyzer: true,
        Anhyzer: true,
        Roller: true,
        Flat: true,
    },
    stability: {
        Understable: true,
        Neutral: true,
        Overstable: true,
    },
    speed: {
        Putter: true,
        Midrange: true,
        Fairway: true,
        Driver: true,
    }
}