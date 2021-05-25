import { Settings } from "./Constants";
import { getData } from "./NonVolitale";

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

// Store here for quick access everywhere else.
export var DisplayVars = {
    darkMode: false,
}
getData(Settings.darkMode.id, (val) => {
    DisplayVars.darkMode = val;
})

export var ShufflePlayers = [];
export function setShufflePlayers(players) {
    ShufflePlayers = players;
}

export var ShuffleTwist = "";
export function setShuffleTwist(twist) {
    ShuffleTwist = twist;
}
