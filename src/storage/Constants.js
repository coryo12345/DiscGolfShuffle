export const GlobalAppStates = {
    mainmenu: 'Home',
    roulette: 'Roulette',
    rouletteOptions: 'Roulette Configuration',
    shuffle: 'Shuffle',
    settings: 'Settings',
};

export const DisplayConfig = {
    main: 'royalblue',
    buttonOpacity: 0.93,
    backgroundColor: '#eee',
};

export const ShuffleRules = [
    "Welcome to Disc Golf Shuffle.",
    "To play, click Start New Game above. At the start of every hole, roll a new twist. The twist applies to the upcoming hole only, for every shot applicable.",
    "Shuffle requires at least 2 people to play. You may play in singles, or group best shot. In either case, you must have at least 2 groups of individuals.",
    "Gameplay will follow traditional Disc Golf rules, (Scramble / Best Disc if in groups) with one exception. Every hole, 1 twist will be applied. The twist could apply to everyone, just you, or anywhere in between.",
    "Some twists will allow players to make choices some will not. Sometimes you will have multiple options for twist to use. In this case, it is up to the designated player or group shown to choose.",
    "Shuffle is a game of chance, some twists may play in your favor, others may not. Who will get lucky? Who will make the smart choices? Only one way to find out!",
];

export const Twists = [
    ["$player1", "can swap drives with any other player"],
    ["$player1", "must make all putts twice, otherwise play continues from the closest missed putt"],
    ["$player1", "may not putt with a putter"],
    ["$player1", "must throw a putter off the tee"],
    ["$player1", "may move all of their lies 5 feet in any direction"],
    ["$player1", "must move all of their lies 5 feet further away from the basket"],
    ["$player1", "may swap drives with", "$player2"],
    ["$player1", "picks what disc", "$player2", "drives with"],
    ["$player1", "must throw a 360 drive"],
    ["$player1", "must move any of their lies within 30 feet of the basket to at least 30 feet away"],
    ["$player1", "can opt to throw a second shot after any first shot, but they must take the second"],
    ["$player1", "can throw a second shot once this hole, and may use it if they want"],
    ["$player1", "can decide to throw for", "$player2", "once this hole"],
    ["$player1", "must throw with their non-dominant hand for the drive"],
    ["$player1", "must throw with their non-dominant hand for the entire hole"],
    ["$player1", "can subtract 1 from their strokes on this hole"],
    ["$player1", "must add 1 to their strokes on this hole"],
]

export const Settings = {
    firstStart: {
        id: "settings.firstStart", 
        display: false, 
        text: "", // no display so not needed
        default: true,
        type:  'n/a', // if display == true
        values: 'n/a', // for dropdown
    },
    // textScale: {
    //     id: "settings.textScale", 
    //     display: true,
    //     text: "Text Scaling",
    //     default: 1.0,
    //     type: 'slider',
    //     values: 'n/a',
    // },
    personalizedAds: {
        id: "settings.personalAds", 
        display: true,
        text: "Allow Personalized Ads",
        default: false,
        type: 'checkbox',
        values: 'n/a',
    },
}
