
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
    },
    arm: {
        "Left Handed": false,
        "Right Handed": false,
    },
    direction: {
        Backhand: false,
        Forehand: false,
        Grenade: false,
        Tomahawk: false,
        Thumber: false,
    }
}

export var ShufflePlayers = [];
export function setShufflePlayers(players) {
    ShufflePlayers = players;
}